import { BaseLayer } from "../../base/BaseLayer"
import { musicbuffObj } from "../../../music/ReadBuff"
import { MusicFactory } from "../../../music/MusicFactory"

/**
 * create by liujiang  2019/12/11 17:45 是时候做一个成品了  一个效果即可  长条缩放
 * randomShape 
 */
export class MusicEffLineScale extends BaseLayer {
    constructor() {
        super()
        this.initView()
        this.startLoop()
    }
    _update() {
        super._update()
        this.setLine()

    }
    _cernter: Laya.Point
    buff: musicbuffObj
    _count = 0
    degre = 0
    _ractList = []
    _shapList = []

    _stmp = 0
    defColor
    initView() {
        /*this.removeChildren()
        window["dddd"] = this
        
        this.defColor = 0x472d56// gt.getHexColor(94, 255, 255)// 0x411445
      
        this.degre = MusicFactory .getMusicValueDegre()
        this._count = MusicFactory.getVoicehighCount()
        this._cernter = new Laya.Point(gt.size.width / 2, gt.size.height / 2)
        let width = Math.floor(gt.size.width / this._count)
        let matrix = new Laya.Matrix()
        matrix.createGradientBox(width, gt.size.height, Math.PI / 2);
        let colors = [0x411445,0x45224a, 0x472d56]//[0x00688B, 0x008B8B, 0x33CCFF]// [0x000000, gt.getHexColor(1, 32, 97), 0xff0000]
        let alphas = [1, 0.9, 0.8]
        let ratios = [255 / 8, 255 / 8 * 4, 255]
        for (let i = 0; i < this._count; i++) {
            let ract = new egret.Shape()
            ract.graphics.beginGradientFill(egret.GradientType.LINEAR, colors, alphas, ratios, matrix);
            ract.graphics.drawRect(i * (width + 2), 0, width, gt.size.height);
            ract.graphics.endFill();
            ract.scaleY = 0.00001
            this.lineFocus.addChild(ract);
            this._ractList.push(ract)
        }
        this.buff = <Music.musicbuffObj>{}
        this.buff.step = 0
        this.buff.voicehigh = []
        this.scaleY = -1
        this.y = gt.size.height
        this.lineFocus.filters = [gt.getLineFilter(this.defColor)]*/

        //平面
        let plane = this.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(10, 10, 10, 10))) as Laya.MeshSprite3D;
        let planeMat = new Laya.BlinnPhongMaterial();
        Laya.Texture2D.load("res/grass.png", Laya.Handler.create(this, (tex: Laya.Texture2D) => {
            planeMat.albedoTexture = tex;
        }));
        //设置纹理平铺和偏移
        let tilingOffset = planeMat.tilingOffset;
        tilingOffset.setValue(5, 5, 0, 0);
        planeMat.tilingOffset = tilingOffset;
        //设置材质
        plane.meshRenderer.material = planeMat;

        //平面添加物理碰撞体组件
        let planeStaticCollider = plane.addComponent(Laya.PhysicsCollider);
        //创建盒子形状碰撞器
        let planeShape = new Laya.BoxColliderShape(10, 0, 10);
        //物理碰撞体设置形状
        planeStaticCollider.colliderShape = planeShape;
        //物理碰撞体设置摩擦力
        planeStaticCollider.friction = 2;
        //物理碰撞体设置弹力
        planeStaticCollider.restitution = 0.3;
        this.mat1 = new Laya.BlinnPhongMaterial();
        //加载纹理资源
        Laya.Texture2D.load("res/wood.jpg", Laya.Handler.create(this, (tex: Laya.Texture2D) => {
            this.mat1.albedoTexture = tex;
            //添加一个球体
            Laya.timer.loop(500, this, () => {
                this.addBox();
            });
        }));



        this.setLine()
        this.addBox()
    }
    mat1

    setLine() {
        this._stmp++
        if (this.buff && this.buff.voicehigh) {
            for (let i = 0; i < this._ractList.length; i++) {
                let rack = this._ractList[i]
                let sy = Number(this.buff.voicehigh[i * this.buff.step]) / this.degre
                sy = Math.abs(sy)
                rack.scaleY = sy
            }
        }

    }

    private addBox(): void {
        //创建盒型MeshSprite3D
        let box = this.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.75, 0.5, 0.5))) as Laya.MeshSprite3D;
        //设置材质
        //box.meshRenderer.material = this.mat1
        box.meshFilter
        let transform = box.transform;
        let pos = transform.position;
        pos.setValue(0.1, 10, 0.1);
        transform.position = pos;
        //创建刚体碰撞器
        let rigidBody = box.addComponent(Laya.Rigidbody3D);
        //创建盒子形状碰撞器
        let boxShape = new Laya.BoxColliderShape(0.75, 0.5, 0.5);
        //设置盒子的碰撞形状
        rigidBody.colliderShape = boxShape;
        //设置刚体的质量
        rigidBody.mass = 10;




        /*
        //正方体
        var box = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5)));
        box.transform.position = new Laya.Vector3(2.0, 0.25, 0.6);
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        //球体
        var sphere = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.25, 20, 20)));
        sphere.transform.position = new Laya.Vector3(1.0, 0.25, 0.6);
        //圆柱体
        var cylinder = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCylinder(0.25, 1, 20)));
        cylinder.transform.position = new Laya.Vector3(0, 0.5, 0.6);
        //胶囊体
        var capsule = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCapsule(0.25, 1, 10, 20)));
        capsule.transform.position = new Laya.Vector3(-1.0, 0.5, 0.6);
        //圆锥体
        var cone = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createCone(0.25, 0.75)));
        cone.transform.position = new Laya.Vector3(-2.0, 0.375, 0.6);
        //平面
        var plane = sprite3D.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(6, 6, 10, 10)));
        */

        
    }
}