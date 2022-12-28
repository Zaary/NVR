import Player from "../type/Player";

const config = {
    maxScreenWidth: 1920,
    maxScreenHeight: 1080,
    serverUpdateRate: 9,
    maxPlayers: 40,
    maxPlayersHard: 50,
    collisionDepth: 6,
    minimapRate: 3000,
    colGrid: 10,
    clientSendRate: 5,
    healthBarWidth: 50,
    iconPadding: 15,
    iconPad: 0.9,
    deathFadeout: 3000,
    crownIconScale: 60,
    crownPad: 35,
    chatCountdown: 3000,
    chatCooldown: 500,
    inSandbox: window.location.origin.indexOf("sandbox") != -1,
    maxAge: 100,
    gatherAngle: Math.PI / 2.6,
    gatherWiggle: 10,
    hitReturnRatio: 0.25,
    hitAngle: Math.PI / 2,
    playerScale: 35,
    playerSpeed: 0.0016,
    playerDecel: 0.993,
    nameY: 34,
    skinColors: ["#bf8f54", "#cbb091", "#896c4b", "#fadadc", "#ececec", "#c37373", "#4c4c4c", "#ecaff7", "#738cc3", "#8bc373"],
    animalCount: 7,
    aiTurnRandom: 0.06,
    cowNames: ["Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky"],
    shieldAngle: Math.PI / 3,
    weaponVariants: [{
		id: 0,
		src: "",
		xp: 0,
		val: 1
	}, {
		id: 1,
		src: "_g",
		xp: 3000,
		val: 1.1
	}, {
		id: 2,
		src: "_d",
		xp: 7000,
		val: 1.18
	}, {
		id: 3,
		src: "_r",
		poison: true,
		xp: 12000,
		val: 1.18
	}],
    fetchVariant: function(player: Player) {
		var tmpXP = player.weaponXP[player.weaponIndex]||0;
		for (var i = module.exports.weaponVariants.length - 1; i >= 0; --i) {
			if (tmpXP >= module.exports.weaponVariants[i].xp)
				return config.weaponVariants[i];
		}
    },
    resourceTypes: ["wood", "food", "stone", "points"],
    areaCount: 7,
    treesPerArea: 9,
    bushesPerArea: 3,
    totalRocks: 32,
    goldOres: 7,
    riverWidth: 724,
    riverPadding: 114,
    waterCurrent: 0.0011,
    waveSpeed: 0.0001,
    waveMax: 1.3,
    treeScales: [150, 160, 165, 175],
    bushScales: [80, 85, 95],
    rockScales: [80, 85, 90],
    snowBiomeTop: 2400,
    snowSpeed: 0.75,
    maxNameLength: 15,
    mapScale: 14400,
    mapPingScale: 40,
    mapPingTime: 2200
}

export default config;