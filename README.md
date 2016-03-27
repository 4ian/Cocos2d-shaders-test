# Cocos2d-JS/Cocos2d-x shader and uniforms

Cocos2d-x allows to use shaders, which are supported both on native platforms and in HTML5 with WebGL. To pass custom parameters to a shader, you use shader uniforms.

 * Cocos2d provides [cc.GLProgram](http://www.cocos2d-x.org/docs/api-ref/js/v3x/symbols/cc.GLProgram.html) to update these uniforms but it only works with the HTML5 version.
 * If you want it to work when compiling with Cocos2d-x for Windows/Android/iOS/OS X/Linux, you have to use [cocos2d::Node::getGLProgramState](http://www.cocos2d-x.org/reference/native-cpp/V3.10/d3/d82/classcocos2d_1_1_node.html#ab46b15fee7689524195a544dc7ff29bd). Luckily it is provided in the JS bindings of Cocos2d-x.

This example shows how to use both to have shader uniforms properly updated on all platforms.

## How to test this example

* Be sure to have [Cocos2d-x](http://cocos2d-x.org) installed.
* Create a new Cocos2d project with Javascript:

````
cocos new -l js ShadersTest
````

* Copy the content of this git in the created folder, replacing `res`, `src` and root files.
* Try the HTML5 version. You need to serve the files using a server. For example:

````
npm i http-server
http-server .
````

* The HTML5 version will display the Cocos2d Hello World game with a shader applied to the sprite. The sprite will blink because a uniform of the shader is randomly updated at each new frame.

* Try the game using a Cocos2d-x platform. For example:

````
cocos run -p mac
````

See a related issue discussion here: http://discuss.cocos2d-x.org/t/basic-shader-help/16533/13
