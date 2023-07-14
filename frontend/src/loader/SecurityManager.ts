interface VMConfig {
    stack: {
        maxStringByteLength: number
    }
}

export default class SecurityManager {
    constructor() {

    }

    checkHref() {
        const loc = window.location;
        if (!(loc instanceof Location)) return false;
        if ((<Location & { [Symbol.toStringTag]: string }> location)[Symbol.toStringTag] != "Location") return false;
        if (loc.host !== "sandbox.moomoo.io") return false;
        return true;
    }

    createVM(byteCode: string, config: VMConfig, references: any[]) { // referenes indexes: 0 = symbol, 2 = fingerprint getter, 5 = success function, 3 = failure         
        //const byteCode = "DgEADxMFAQ4BQA8TBQIOAQAVEgwRRRAAEUUDbXlmcAAAFg4BQBMFABQQFxMFAxg=";

        const instructions = new DataView(new TextEncoder().encode(window.atob(byteCode) + "\0").buffer);
        let instructionsReadIndex = 0;
        const stack = new DataView(new Uint8Array(65535).buffer);
        let stackPointer = 0;

        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        function remainingInstructionsCount() {
            return instructions.byteLength - instructionsReadIndex;
        }

        function getNextInstruction() {
            return instructions.getUint8(instructionsReadIndex++);
        }

        function executeNextInstruction() {
            return executeInstruction(getNextInstruction());
        }

        function setStackPointer(index: number) {
            stackPointer = index;
        }

        function peekInstructionU8Value(): number | null {
            return remainingInstructionsCount() > 0 ? instructions.getUint8(instructionsReadIndex) : null;
        }

        function readInstructionU8Value(): number {
            return instructions.getUint8(instructionsReadIndex++);
        }

        function readInstructionU16Value(): number {
            const value = instructions.getUint16(instructionsReadIndex);
            instructionsReadIndex += 2;
            return value;
        }

        function readInstructionStrValue(): string {
            const buffer = new Uint8Array(remainingInstructionsCount());
            let byte, length = 0;
            do {
                byte = readInstructionU8Value();
                buffer[length++] = byte/* ^ xorIndex*/;
                //xorIndex = (xorIndex + 3) % 256;
            } while (byte !== 0x00);
            return decoder.decode(buffer.slice(0, length - 1));
        }

        function readInstructionValue(): any {
          
            const valueType = getNextInstruction();
            switch (valueType) {
                case VM_OPCODE_VALUE_U8:
                    return readInstructionU8Value();
                case VM_OPCODE_VALUE_U16:
                    return readInstructionU16Value();
                case VM_OPCODE_VALUE_STR:
                    return readInstructionStrValue();
                case VM_OPCODE_VALUE_PTR:
                    return readPointer();
                case VM_OPCODE_VALUE_REF:
                    return readReference();
                case VM_OPCODE_EXEC_FUNCTION:
                    return executeFunction(readInstructionValue());
                default:
                    return executeInstruction(valueType);
            }
        }
        
        function writeStack(value: any) {
            switch (typeof value) {
                case "number":
                    if (value < 256) {
                        stack.setUint8(stackPointer++, VM_OPCODE_VALUE_U8);
                        stack.setUint8(stackPointer++, value);
                    } else if (value < 65536) {
                        stack.setUint8(stackPointer++, VM_OPCODE_VALUE_U16);
                        stack.setUint16(stackPointer, value);
                        stackPointer += 2;
                    }
                    break;
                case "string": {
                    const bytes = encoder.encode(value);
                    stack.setUint8(stackPointer++, VM_OPCODE_VALUE_STR);
                    for (let i = 0; i < bytes.byteLength; i++) stack.setUint8(stackPointer++, bytes[i]);
                    stack.setUint8(stackPointer++, 0x00);
                    break;
                }
            }
        }

        function readStack() {
            const type = stack.getUint8(stackPointer++);
            switch (type) {
                case VM_OPCODE_VALUE_U8:
                    return stack.getUint8(stackPointer++);
                    break;
                case VM_OPCODE_VALUE_U16: {
                    const value = stack.getUint16(stackPointer);
                    stackPointer += 2;
                    return value;
                    break;
                }
                case VM_OPCODE_VALUE_STR: {
                    const buffer = new Uint8Array(config.stack.maxStringByteLength);
                    let byte, length = 0;
                    do {
                        buffer[length++] = byte = stack.getUint8(stackPointer++);
                    } while (byte !== 0x00);
                    return decoder.decode(buffer.slice(0, length - 1));
                    break;
                }
            }
        }

        function readPointer() {
            const pointer = readInstructionU8Value();
            setStackPointer(pointer);
            return readStack();
        }

        function performMathOperation(operator: number) {
            const leftValue = readInstructionValue();
            const rightValue = readInstructionValue();
            switch (operator) {
                case VM_OPCODE_OPERATOR_ADD:
                    return leftValue + rightValue;
                    break;
                case VM_OPCODE_OPERATOR_SUB:
                    return leftValue - rightValue;
                    break;
                case VM_OPCODE_OPERATOR_MULT:
                    return leftValue * rightValue;
                    break;
                case VM_OPCODE_OPERATOR_DIV:
                    return leftValue / rightValue;
                    break;
                case VM_OPCODE_OPERATOR_XOR:
                    return leftValue ^ rightValue;
                    break;
                case VM_OPCODE_OPERATOR_NT:
                    return leftValue + "\0";
                    break;
            }
        }

        function performComparation(comparator: number) {
            const leftValue = readInstructionValue();
            const rightValue = readInstructionValue();
            switch (comparator) {
                case VM_OPCODE_COMPARATOR_EQ:
                    return leftValue == rightValue;
                    break;
                case VM_OPCODE_COMPARATOR_EQ3:
                    return leftValue === rightValue;
                    break;
            }
        }

        function readReference() {
            const value = readInstructionU8Value();
            return references[value];
        }

        function executeFunction(func: Function) {
            const params: any[] = [];

            while (peekInstructionU8Value() === VM_OPCODE_FUNCTION_PARAM) {
                readInstructionU8Value(); // shift param opener instruction
                params.push(readInstructionValue());
            }

            console.log("executing", func, params);

            return func.apply(null, params);
        }

        function readBranch() {
            const branchType = peekInstructionU8Value();
            if (branchType !== VM_OPCODE_BRANCH_S1 && branchType !== VM_OPCODE_BRANCH_S2) {
                return -1;
            }; // shift the peeked value

            //const arr = new Uint8Array(config.instructions.maxBranchLength);
            const endingCode = branchType === VM_OPCODE_BRANCH_S1 ? VM_OPCODE_BRANCH_S2 : VM_OPCODE_BRANCH_END;
            let byte, length = 0;
            const index = instructionsReadIndex + 1;

            while ((byte = readInstructionU8Value()) !== endingCode && byte !== VM_OPCODE_BRANCH_END) { length++ };
            //while ((byte = readInstructionU8Value()) !== endingCode) arr[length++] = byte;

            instructionsReadIndex = index + length - 1;
            return [index, index + length];
        }

        function executeConditionalBranch() {
            const conditionResult = executeNextInstruction();

            const s1 = <[number, number]> readBranch();
            const s2 = readBranch();

            let byte;

            if (conditionResult) {
              instructionsReadIndex = s1[0];
              do {
                byte = readInstructionU8Value();
                executeInstruction(byte);
              } while (instructionsReadIndex < s1[1]);

              if (s2 !== -1) instructionsReadIndex = s2[1];
            } else if (s2 !== -1) {
              instructionsReadIndex = s2[0];
              do {
                byte = readInstructionU8Value();
                executeInstruction(byte);
              } while (instructionsReadIndex < s2[1]);
            }
        }
        
        function executeInstruction(instruction: number): any {
            switch (instruction) {
                case VM_OPCODE_EXECUTE_INSTRUCTION:
                    return executeNextInstruction();
                case VM_OPCODE_SET_STACK_POINTER:
                    return setStackPointer(readInstructionValue());
                case VM_OPCODE_WRITE_STACK:
                    return writeStack(readInstructionValue());
                case VM_OPCODE_READ_STACK:
                    return readStack();
                case VM_OPCODE_MATH_OPERATION:
                    return performMathOperation(readInstructionU8Value());
                case VM_OPCODE_COMP_OPERATION:
                    return performComparation(readInstructionU8Value());
                case VM_OPCODE_BRANCH_START:
                    executeConditionalBranch();
                    break;
                case VM_OPCODE_EXEC_FUNCTION:
                    return executeFunction(readInstructionValue());
            }
        }

        return function execute() {
            while (remainingInstructionsCount() > 0) executeInstruction(getNextInstruction());
        }
    }
}