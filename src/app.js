var hardcodeFrameUniform = true;

var isHTML5 = function() {
    return typeof document !== "undefined";
}

var makeTilingShader = function() {
    var shader = new cc.GLProgram();

    var projectionMatrix = isHTML5() ?
        "(CC_PMatrix * CC_MVMatrix)" :
        "CC_PMatrix";
    shader.initWithString(
        ""
        + "       \n"
        + "attribute vec4 a_position;\n"
        + "attribute vec2 a_texCoord;\n"
        + "attribute vec4 a_color;\n"
        + "					\n"
        + "\n"
        + "varying vec4 v_fragmentColor;\n"
        + "varying vec2 v_texCoord;\n"
        + "								\n"
        + "void main()	\n"
        + "{							\n"
        + "    gl_Position = " + projectionMatrix + " * a_position;\n"
        + "	v_fragmentColor = a_color;\n"
        + "	v_texCoord = a_texCoord;\n"
        + "}\n"
        ,
        ""
        + "varying vec4 v_fragmentColor;	\n"
        + "varying vec2 v_texCoord;	\n"
        + "uniform float u_value;	\n"
        + "\n"
        + "void main()			\n"
        + "{\n"
        + "    vec4 v_orColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n"
        + "    float gray = dot(v_orColor.rgb, vec3(u_value, 0.587, 0.114));\n"
        + "    gl_FragColor = vec4(gray, gray, gray, v_orColor.a);\n"
        + "}\n"
    );

    shader.addAttribute("a_position", 0);
    shader.addAttribute("a_color", 1);
    shader.addAttribute("a_texCoord", 2);
    shader.link();
    shader.updateUniforms();

    return shader;
}

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        this._shader = makeTilingShader();
        this._shader.retain();
        this._valueUniform = this._shader.getUniformLocationForName('u_value');

        this.sprite.setShaderProgram(this._shader);

        this.scheduleUpdate();

        return true;
    },
    update: function() {
        this._shader.use();
        this._shader.setUniformLocationWith1f(this._valueUniform, Math.random());
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
