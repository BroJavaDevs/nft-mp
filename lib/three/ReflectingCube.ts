import {
  WebGLRenderer,
  Scene,
  Object3D,
  MultiMaterial,
  PointLight,
  Vector3,
  Quaternion,
  Vector2,
  Raycaster,
  TextureLoader,
  MeshBasicMaterial,
  CubeGeometry,
  Mesh,
  BoxGeometry,
  CubeTextureLoader,
  RGBAFormat,
  CubeRefractionMapping,
  ShaderLib,
  ShaderMaterial,
  BackSide,
  PerspectiveCamera,
} from "three";

const SKYBOX_IMG =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/black-marble.jpg";

const SOCIAL_LINKS = [
  {
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/social_codepen.png",
    link: "https://codepen.io/halvves/",
  },
  {
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/social_github.png",
    link: "https://github.com/halvves",
  },
  {
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/social_twitter.png",
    link: "https://twitter.com/halvves",
  },
  {
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/social_instagram.png",
    link: "https://www.instagram.com/halvves/",
  },
  {
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/social_dribbble.png",
    link: "https://dribbble.com/halvves",
  },
  {
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/476907/social_tumblr.png",
    link: "https://halvves.tumblr.com/",
  },
];

export class App {
  constructor() {
    this._bind("_render", "_resize");
    this._setup();
    this._createScene();

    window.addEventListener("resize", this._resize);
  }

  _bind(...methods) {
    methods.forEach((method) => (this[method] = this[method].bind(this)));
  }

  _setup() {
    const renderer = (this._renderer = new WebGLRenderer({
      antialias: true,
    }));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    this._scene = new Scene();
    const camera = (this._camera = new MousePerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ));
    camera.position.set(100, 100, 100);
  }

  _createScene() {
    const scene = this._scene;

    const light = new PointLight(0xffffff);
    light.position.set(100, 100, 100);
    scene.add(light);

    const skybox = new Skybox(
      [800, 800, 800],
      [SKYBOX_IMG, SKYBOX_IMG, SKYBOX_IMG, SKYBOX_IMG, SKYBOX_IMG, SKYBOX_IMG]
    );
    scene.add(skybox);

    const reflectionCube = new ReflectionCube([30, 30, 30], skybox._texture);
    reflectionCube.position.set(0, 0, 0);

    const socialCube = new SocialCube(
      [31, 31, 31],
      SOCIAL_LINKS,
      this._renderer,
      this._camera
    );
    socialCube.position.set(0, 0, 0);

    const cube = (this._cube = new SpinnableObject(reflectionCube, socialCube));
    scene.add(cube);
  }

  _render() {
    const scene = this._scene;
    const camera = this._camera;
    const renderer = this._renderer;
    const cube = this._cube;

    renderer.render(scene, camera);

    camera._update();
    cube._update();

    requestAnimationFrame(this._render);
  }

  _resize(e) {
    const renderer = this._renderer;
    const camera = this._camera;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

class SpinnableObject extends Object3D {
  constructor(...assets) {
    super();

    this._bind("_handleActionStart", "_handleActionMove", "_handleActionEnd");

    this._rotationSpeed = 2;
    this._moveReleaseTimeDelta = 50;
    this._actionOn = false;
    this._curQuaternion;
    this._deltaX = 0;
    this._deltaY = 0;
    this._lastMoveTimestamp = new Date();
    this._rotateStartPoint = new Vector3(0, 0, 1);
    this._rotateEndPoint = new Vector3(0, 0, 1);
    this._startPoint = {
      x: 0,
      y: 0,
    };

    assets.forEach((assets) => this.add(assets));

    document.addEventListener("mousedown", this._handleActionStart, false);
    document.addEventListener("touchstart", this._handleActionStart, false);
  }

  _bind(...methods) {
    methods.forEach((method) => (this[method] = this[method].bind(this)));
  }

  _handleActionStart(e) {
    let action = {
      x: 0,
      y: 0,
    };
    if (e.type === "touchstart") {
      action.x = e.touches[0].clientX;
      action.y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      action.x = e.clientX;
      action.y = e.clientY;
    }

    document.addEventListener("mousemove", this._handleActionMove, false);
    document.addEventListener("touchmove", this._handleActionMove, false);
    document.addEventListener("mouseup", this._handleActionEnd, false);
    document.addEventListener("touchend", this._handleActionEnd, false);

    this._actionOn = true;

    this._startPoint = {
      x: action.x,
      y: action.y,
    };

    this._rotateStartPoint = this._rotateEndPoint = this._projectOnTrackball(
      0,
      0
    );
  }

  _handleActionMove(e) {
    let action = {
      x: 0,
      y: 0,
    };
    if (e.type === "touchmove") {
      action.x = e.touches[0].clientX;
      action.y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      action.x = e.clientX;
      action.y = e.clientY;
    }

    this._deltaX = action.x - this._startPoint.x;
    this._deltaY = action.y - this._startPoint.y;

    this._handleRotation();

    this._startPoint.x = action.x;
    this._startPoint.y = action.y;

    this._lastMoveTimestamp = new Date();
  }

  _handleActionEnd(e) {
    let action = {
      x: 0,
      y: 0,
    };
    if (e.type === "touchend" && e.touches.length > 0) {
      action.x = e.touches[0].clientX;
      action.y = e.touches[0].clientY;
    } else if (e.type === "touchend" && e.pageX) {
      action.x = e.pageX;
      action.y = e.pageY;
    } else {
      e.preventDefault();
      action.x = e.clientX;
      action.y = e.clientY;
    }

    if (
      new Date().getTime() - this._lastMoveTimestamp.getTime() >
      this._moveReleaseTimeDelta
    ) {
      this._deltaX = action.x - this._startPoint.x;
      this._deltaY = action.y - this._startPoint.y;
    }

    this._actionOn = false;

    document.removeEventListener("mousemove", this._handleActionMove, false);
    document.removeEventListener("touchmove", this._handleActionMove, false);
    document.removeEventListener("mouseup", this._handleActionEnd, false);
    document.removeEventListener("touchend", this._handleActionEnd, false);
  }

  _projectOnTrackball(touchX, touchY) {
    const mouseOnBall = new Vector3();

    mouseOnBall.set(
      this._clamp(touchX / (window.innerWidth / 2), -1, 1),
      this._clamp(-touchY / (window.innerHeight / 2), -1, 1),
      0.0
    );

    const length = mouseOnBall.length();

    if (length > 1.0) {
      mouseOnBall.normalize();
    } else {
      mouseOnBall.z = Math.sqrt(1.0 - length * length);
    }

    return mouseOnBall;
  }

  _rotateMatrix(rotateStart, rotateEnd) {
    const axis = new Vector3();
    const quaternion = new Quaternion();

    let angle = Math.acos(
      rotateStart.dot(rotateEnd) / rotateStart.length() / rotateEnd.length()
    );

    if (angle) {
      axis.crossVectors(rotateStart, rotateEnd).normalize();
      angle *= this._rotationSpeed;
      quaternion.setFromAxisAngle(axis, angle);
    }
    return quaternion;
  }

  _handleRotation() {
    this._rotateEndPoint = this._projectOnTrackball(this._deltaX, this._deltaY);

    const rotateQuaternion = this._rotateMatrix(
      this._rotateStartPoint,
      this._rotateEndPoint
    );
    this._curQuaternion = this.quaternion;
    this._curQuaternion.multiplyQuaternions(
      rotateQuaternion,
      this._curQuaternion
    );
    this._curQuaternion.normalize();
    this.setRotationFromQuaternion(this._curQuaternion);

    this._rotateEndPoint = this._rotateStartPoint;
  }

  _clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  _update() {
    if (!this._actionOn) {
      const drag = 0.95;
      const minDelta = 0.05;

      if (this._deltaX < -minDelta || this._deltaX > minDelta) {
        this._deltaX *= drag;
      } else {
        this._deltaX = 0;
      }

      if (this._deltaY < -minDelta || this._deltaY > minDelta) {
        this._deltaY *= drag;
      } else {
        this._deltaY = 0;
      }

      this._handleRotation();
    }
  }
}

class SocialCube extends Object3D {
  constructor(size, social, renderer, camera) {
    super();

    this._bind(
      "_handleActionStart",
      "_handleMouseMove",
      "_handleActionEnd",
      "_unbindSocial"
    );

    this._camera = camera;
    this._mouse = new Vector2();
    this._raycaster = new Raycaster();
    this._renderer = renderer;
    this._social = social;

    const loader = new TextureLoader();
    loader.setCrossOrigin("");

    const materials = [];
    for (let i = 0; i < social.length; i++) {
      loader.load(social[i].image, (t) => {
        t.offset.set(-0.5, -0.5);
        t.repeat.set(2, 2);

        let face = new MeshBasicMaterial({
          map: t,
          transparent: true,
        });
        face.map.needsUpdate = true;

        // explicitly set array index instead of Array.push
        // to make sure faces still match their respective links
        materials[i] = face;

        if (i === social.length - 1) {
          this._material = new MultiMaterial(materials);
          this._geometry = new CubeGeometry(size[0], size[1], size[2]);
          this._mesh = new Mesh(this._geometry, this._material);
          this._mesh.doubleSided = true;
          this.add(this._mesh);

          document.addEventListener(
            "touchstart",
            this._handleActionStart,
            false
          );
          document.addEventListener(
            "mousedown",
            this._handleActionStart,
            false
          );
          document.addEventListener("mousemove", this._handleMouseMove, false);
        }
      });
    }
  }

  _bind(...methods) {
    methods.forEach((method) => (this[method] = this[method].bind(this)));
  }

  _getIntersects(x, y) {
    this._mouse.x = (x / this._renderer.domElement.clientWidth) * 2 - 1;
    this._mouse.y = -(y / this._renderer.domElement.clientHeight) * 2 + 1;

    this._raycaster.setFromCamera(this._mouse, this._camera);

    return this._raycaster.intersectObject(this._mesh);
  }

  _handleActionStart(e) {
    let action = {
      x: 0,
      y: 0,
    };
    if (e.type === "touchstart") {
      action.x = e.touches[0].clientX;
      action.y = e.touches[0].clientY;
    } else {
      e.preventDefault();
      action.x = e.clientX;
      action.y = e.clientY;
    }

    const intersects = this._getIntersects(action.x, action.y);

    if (intersects.length > 0) {
      this._bindSocial();
      setTimeout(this._unbindSocial, 1400);
    }
  }

  _handleActionEnd(e) {
    let action = {
      x: 0,
      y: 0,
    };
    if (e.type === "touchend" && e.touches.length > 0) {
      action.x = e.touches[0].clientX;
      action.y = e.touches[0].clientY;
    } else if (e.type === "touchend" && e.pageX) {
      action.x = e.pageX;
      action.y = e.pageY;
    } else {
      e.preventDefault();
      action.x = e.clientX;
      action.y = e.clientY;
    }

    const intersects = this._getIntersects(action.x, action.y);
    this._fireLink(intersects);
  }

  _fireLink(intersects) {
    if (intersects.length > 0) {
      const index = intersects[0].face.materialIndex;

      if (index >= 0 && index < this._social.length) {
        window.open(this._social[index].link, "_blank", "", "");
      } else {
        console.log("wtf am i clicking on?");
      }
    }
    this._unbindSocial();
  }

  _handleMouseMove(e) {
    e.preventDefault();
    const intersects = this._getIntersects(e.clientX, e.clientY);

    if (intersects.length > 0) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "move";
    }
  }

  _bindSocial() {
    document.addEventListener("mouseup", this._handleActionEnd, false);
    document.addEventListener("touchend", this._handleActionEnd, false);

    // possibly roll this into its own handleCancel function
    // to allow some mouseMove fudging... more than a certain delta
    // THEN unbind... otherwise... forgive the poor finger slider
    // ****************************************************************
    document.addEventListener("mousemove", this._unbindSocial, false);
    document.addEventListener("touchmove", this._unbindSocial, false);
    // ****************************************************************
  }

  _unbindSocial() {
    document.removeEventListener("mouseup", this._handleActionEnd, false);
    document.removeEventListener("touchend", this._handleActionEnd, false);

    // ****************************************************************
    document.removeEventListener("mousemove", this._unbindSocial, false);
    // ****************************************************************
  }
}

class ReflectionCube extends Object3D {
  constructor(size, reflect) {
    super();

    this._material = new MeshBasicMaterial({
      color: 0xffffff,
      wireframe: false,
      envMap: reflect,
      refractionRatio: 0.8,
    });

    this._geometry = new BoxGeometry(size[0], size[1], size[2]);

    this._mesh = new Mesh(this._geometry, this._material);

    this.add(this._mesh);
  }
}

class Skybox extends Object3D {
  constructor(size, images) {
    super();

    const loader = new CubeTextureLoader();
    loader.setCrossOrigin("");

    this._texture = loader.load(images, (t) => {
      t.format = RGBAFormat;
      t.mapping = CubeRefractionMapping;

      const shader = ShaderLib["cube"];
      shader.uniforms["tCube"].value = t;

      this._geometry = new BoxGeometry(size[0], size[1], size[2]);

      this._material = new ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        depthWrite: false,
        side: BackSide,
      });

      this._mesh = new Mesh(this._geometry, this._material);

      this.add(this._mesh);
    });
  }
}

class MousePerspectiveCamera extends PerspectiveCamera {
  constructor(...args) {
    super(...args);

    this._handleMouseMove = this._handleMouseMove.bind(this);

    this._mouseX = 0;
    this._mouseY = 0;

    document.addEventListener("mousemove", this._handleMouseMove, false);
  }

  _handleMouseMove(e) {
    e.preventDefault();
    this._mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
    this._mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
  }

  _update() {
    this.position.x += (this._mouseX - this.position.x) * 0.015;
    this.position.y += (-this._mouseY - this.position.y) * 0.015;
  }
}
