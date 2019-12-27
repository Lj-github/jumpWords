import { ui } from "./../ui/layaMaxUI";
import { MusicFactory } from "../music/MusicFactory";
import { TextUI } from "../layer/music/TextUI";
import { MusicEffLineScale } from "../layer/music/release/MusicEffLineScale";
/**
 * 本示例采用非脚本的方式实现，而使用继承页面基类，实现页面逻辑。在IDE里面设置场景的Runtime属性即可和场景进行关联
 * 相比脚本方式，继承式页面类，可以直接使用页面定义的属性（通过IDE内var属性定义），比如this.tipLbll，this.scoreLbl，具有代码提示效果
 * 建议：如果是页面级的逻辑，需要频繁访问页面内多个元素，使用继承式写法，如果是独立小模块，功能单一，建议用脚本方式实现，比如子弹脚本。
 */
export default class GameUI extends ui.test.TestSceneUI {
	private _rootScene: Laya.Scene3D;
	private _rootCamera: Laya.Camera
	private _rootLight: Laya.DirectionLight
	constructor() {
		super();
		this.init3D()
		this.viewOther()
	}
	init3D() {
		this._rootScene = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;
		//初始化照相机
		let camera = this._rootScene.addChild(new Laya.Camera(0, 0.1, 100)) as Laya.Camera;
		camera.transform.translate(new Laya.Vector3(0, 6, 9.5));
		camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
		this._rootCamera = camera
		//方向光
		let directionLight = new Laya.DirectionLight();
		this._rootScene.addChild(directionLight);
		directionLight.color = new Laya.Vector3(0.6, 0.6, 0.6);
		//设置平行光的方向
		let mat = directionLight.transform.worldMatrix;
		mat.setForward(new Laya.Vector3(-1.0, -1.0, -1.0));
		directionLight.transform.worldMatrix = mat;
		this._rootLight = directionLight

	}
	viewOther() {
		let ui  = new MusicEffLineScale ()
		//new TextUI()
		this._rootScene.addChild(ui)
	}

}