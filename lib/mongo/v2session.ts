import mongoose from "mongoose"

/*** V2SESSION ***/
interface IV2Session {
	_id: mongoose.Types.ObjectId
	// PVE
	battleId: number
	battle_uuid: string
	game_started: string
	game_ended: string
	winner: string
	client_id: string
	team_id: string
	fighters: {
		id: number
		level: number
	}[]
	stage_index: number
	total_scenes: number
	last_scene_index: number
	exp: number
	_items: any[]
	captcha: {
		token: string
		trigger: boolean
		result: number
	}

	// SHARED
	did_player_surrender: boolean

	// PVP
	first_client_id: string
	first_team_id: string
	first_team_fighters: number[]
	second_client_id: string
	second_team_id: string
	second_team_fighters: number[]
	eloAndItem: {
		player_id: string
		new_elo: number
		old_elo: number
		_items: any[]
		result_type: string
	}[]
	have_bloodmoon: boolean
	pvp_type: string
	first_client_captcha: {
		token: string
		trigger: boolean
		result: number
	}
	second_client_captcha: {
		token: string
		trigger: boolean
		result: number
	}
}
const v2sessionSchema = new mongoose.Schema<IV2Session>({
	battleId: Number,
	battle_uuid: String,
	game_started: String,
	game_ended: String,
	winner: String,
	client_id: String,
	team_id: String,
	fighters: [
		{
			id: Number,
			level: Number,
		},
	],
	stage_index: Number,
	total_scenes: Number,
	last_scene_index: Number,
	exp: Number,
	_items: [],
	captcha: {
		token: String,
		trigger: Boolean,
		result: Number,
	},

	// SHARED
	did_player_surrender: Boolean,

	// PVP
	first_client_id: String,
	first_team_id: String,
	first_team_fighters: [Number],
	second_client_id: String,
	second_team_id: String,
	second_team_fighters: [Number],
	eloAndItem: [
		{
			player_id: String,
			new_elo: Number,
			old_elo: Number,
			_items: [],
			result_type: String,
		},
	],
	have_bloodmoon: Boolean,
	pvp_type: String,
	first_client_captcha: {
		token: String,
		trigger: Boolean,
		result: Number,
	},
	second_client_captcha: {
		token: String,
		trigger: Boolean,
		result: Number,
	},
})
v2sessionSchema.index({ battleId: -1 })
v2sessionSchema.index({ client_id: 1 })
v2sessionSchema.index({ first_client_id: 1 })
v2sessionSchema.index({ second_client_id: 1 })

export { type IV2Session, v2sessionSchema }

// PVP
// {
//   "battle_uuid": "18ba5dc8-22a4-42ef-922b-d7f6fe8b9c84",
//   "game_started": "2023-09-19T14:55:01",
//   "game_ended": "2023-09-19T14:57:41",
//   "winner": "0x688d861d2a7113e7ebfca3b1ac78ba72dc207deb",
//   "first_client_id": "0x688d861d2a7113e7ebfca3b1ac78ba72dc207deb",
//   "first_team_id": "11718639",
//   "first_team_fighters": [2592365, 3063822, 7652717],
//   "second_client_id": "0xfc452065ccc04af40a3f39d367ddbef347fc43d2",
//   "second_team_id": "41426133",
//   "second_team_fighters": [10724564, 10754795, 11014662],
//   "eloAndItem": [
//     {
//       "player_id": "0x688d861d2a7113e7ebfca3b1ac78ba72dc207deb",
//       "new_elo": 952,
//       "old_elo": 932,
//       "_items": [],
//       "result_type": "win"
//     },
//     {
//       "player_id": "0xfc452065ccc04af40a3f39d367ddbef347fc43d2",
//       "new_elo": 977,
//       "old_elo": 997,
//       "_items": [],
//       "result_type": "lose"
//     }
//   ],
//   "did_player_surrender": false,
//   "have_bloodmoon": false,
//   "pvp_type": "arena",
//   "first_client_captcha": {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTczZmVhNGEtMTkwNC00OGVkLWIwYTgtOWRmMTFkYTcxNjY4IiwiZXhwIjoxNjk1MTg1NjE0LCJpYXQiOjE2OTUwOTkyMTQsImlzcyI6InBvcnlnb24ifQ.VtvITcvPPQ6FD3rRk19imb6lO_2MDttr2YHvv6EsDag",
//     "trigger": false,
//     "result": -2
//   },
//   "second_client_captcha": {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZWI2ZGZkZjUtZTkwMi00N2E3LWEyNTEtYWU5YmMxMzg5OTNjIiwiZXhwIjoxNjk1MTY3OTY5LCJpYXQiOjE2OTUwODE1NjksImlzcyI6InBvcnlnb24ifQ.Mjiil341XIe9VWRjbLj6gbQT_GajZdI0_BGyHaf09Qc",
//     "trigger": false,
//     "result": -2
//   }
// }

// PVE
// {
// 	"battle_uuid": "92c3e0e3-f9d2-45f8-9fb2-93e5fa2bb2de",
// 	"game_started": "2023-09-01T00:09:37",
// 	"game_ended": "2023-09-01T00:13:25",
// 	"winner": "0x3146d663721484c4dc6e5c76cab4a677094cf656",
// 	"client_id": "0x3146d663721484c4dc6e5c76cab4a677094cf656",
// 	"team_id": "39189452",
// 	"fighters": [
// 		{ "id": 1212953, "level": 1 },
// 		{ "id": 1943048, "level": 2 },
// 		{ "id": 5361982, "level": 1 }
// 	],
// 	"stage_index": 3,
// 	"total_scenes": 2,
// 	"last_scene_index": 1,
// 	"exp": 111,
// 	"_items": [],
// 	"did_player_surrender": false,
// 	"captcha": {
// 		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMTExOGU5NjYtZWEwZS00M2JmLWFmZTQtZGI0NjcwNmI2ZmY0IiwiZXhwIjoxNjkzNTc2NTAyLCJpYXQiOjE2OTM0OTAxMDIsImlzcyI6InBvcnlnb24ifQ.lWKESN5YnTLP5hRCXmg12wbKqrHd4xhICfTc5nQQFDc",
// 		"trigger": false,
// 		"result": -2
// 	}
// }
