export class TextUI extends Laya.Sprite {
    constructor() {
        super()

        this.createView()
    }
    mat1
    createView() {
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
    }


    private addBox(): void {
        //创建盒型MeshSprite3D
        let box = this.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.75, 0.5, 0.5))) as Laya.MeshSprite3D;
        //设置材质
        box.meshRenderer.material = this.mat1;
        let transform = box.transform;
        let pos = transform.position;
        pos.setValue(0, 10, 0);
        transform.position = pos;
        //创建刚体碰撞器
        let rigidBody = box.addComponent(Laya.Rigidbody3D);
        //创建盒子形状碰撞器
        let boxShape = new Laya.BoxColliderShape(0.75, 0.5, 0.5);
        //设置盒子的碰撞形状
        rigidBody.colliderShape = boxShape;
        //设置刚体的质量
        rigidBody.mass = 10;
    }


}