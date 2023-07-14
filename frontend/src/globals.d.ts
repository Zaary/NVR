interface Window {
    requestAnimFrame(callback: { (time: DOMHighResTimeStamp): void; }): number;
    captchaCallback: (() => void) | undefined;
    __fpjs_p_l_b: any;
}

declare const CORE_LOADER_CODE: string;
declare const CORE_LOADER_LCRC: number;
declare const CORE_LOADER_CCRC: number;

declare const VM_OPTION_NULL: number;

declare const VM_OPCODE_VALUE_U8: number;
declare const VM_OPCODE_VALUE_U16: number;
declare const VM_OPCODE_VALUE_STR: number;
declare const VM_OPCODE_VALUE_PTR: number;
declare const VM_OPCODE_VALUE_REF: number;

declare const VM_OPCODE_OPERATOR_ADD: number;
declare const VM_OPCODE_OPERATOR_SUB: number;
declare const VM_OPCODE_OPERATOR_MULT: number;
declare const VM_OPCODE_OPERATOR_DIV: number;
declare const VM_OPCODE_OPERATOR_XOR: number;
declare const VM_OPCODE_OPERATOR_NT: number;

declare const VM_OPCODE_COMPARATOR_EQ: number;
declare const VM_OPCODE_COMPARATOR_EQ3: number;

declare const VM_OPCODE_EXECUTE_INSTRUCTION: number;
declare const VM_OPCODE_SET_STACK_POINTER: number;
declare const VM_OPCODE_WRITE_STACK: number;
declare const VM_OPCODE_READ_STACK: number;
declare const VM_OPCODE_MATH_OPERATION: number;
declare const VM_OPCODE_COMP_OPERATION: number;

declare const VM_OPCODE_EXEC_FUNCTION: number;
declare const VM_OPCODE_FUNCTION_PARAM: number;

declare const VM_OPCODE_BRANCH_START: number;
declare const VM_OPCODE_BRANCH_S1: number;
declare const VM_OPCODE_BRANCH_S2: number;
declare const VM_OPCODE_BRANCH_END: number;

declare const VM_OPCODE_DEBUG: number;

declare module "*.html" {
    const content: string;
    export default content;
}

declare module "!!raw-loader!*" {
    const content: string;
    export default content;
}