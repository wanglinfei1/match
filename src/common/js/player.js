/**
 * Created by wanglinfei on 2017/8/9.
 */
export default class Player {
  constructor({id,exist,lineUp,name, num}) {
    this.id = id;
    this.lineUp = lineUp;
    this.exist=exist;
    this.name = name;
    this.num = num
  }
}
