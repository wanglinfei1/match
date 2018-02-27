/**
 * Created by wanglinfei on 2017/8/10.
 */
export const PLAY_KEY = '_itemPlayer1__'
export const PLAY_KEY2 = '_itemPlayer2__'
export const itemColor = [{text: '深色', color: '#ff4646'}, {text: '浅色', color: '#1656a5'}];
export const matchLength = 2
export const sectionArr = ['第一节', '第二节', '加时']
export const operation = [
  [
    {name: '前场篮板', type: 'offensive_rebounds'},
    {name: '助攻', type: 'assists'},
    {name: '盖帽', type: 'blocks'},
    {name: '抢断', type: 'steals'}
  ],
  [
    {name: '后场篮板', type: 'defensive_rebounds'},
    {name: '2分命中', type: 'score', score: 2},
    {name: '3分命中', type: 'score', score: 3},
    {name: '罚球命中', type: 'score', score: 1},
  ],
  [
    {name: '犯规', type: 'foul', foul: '犯规', foulDet:
      [
        {name: '技术犯规', type: 'foul', foul: 'foul-1'},
        {name: '违体', type: 'foul', foul: 'foul-2'},
        {name: '夺权', type: 'foul', foul: 'foul-3'}
      ]
    },
    {name: '2分不中', type: 'two_points_lose'},
    {name: '3分不中', type: 'three_points_lose'},
    {name: '罚球不中', type: 'free_throws_lose'}],
  [
    {name: '暂停', type: 'pause', pause: 'pause', pauseDet:
      [
        {name: '暂停', time: '30s', type: 'pause', pause: 'pause-1'},
        {name: '暂停', time: '60s', type: 'pause', pause: 'pause-2'},
        {name: '暂停', time: '90s', type: 'pause', pause: 'pause-3'}
      ]
    },
    {name: '失误', type: 'turnovers'}
  ]
]
export const operation2 = [
  {name: '2分命中', type: 'score', score: 2},
  {name: '3分命中', type: 'score', score: 3},
  {name: '罚球命中', type: 'score', score: 1},
  {name: '犯规', type: 'foul', foul: '犯规'},
  {name: '暂停', type: 'pause', pause: 'pause'},
]
