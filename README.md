Cocos2d-x shader test
=====================

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

* Run the game using a Cocos2d-x platform. For example:

````
cocos run -p mac
````

The sprite won't blink, because the uniform is not properly updated and always stay at 0. Tested against Cocos2d-x 3.10.

See a related issue discussion here: http://discuss.cocos2d-x.org/t/basic-shader-help/16533/13
