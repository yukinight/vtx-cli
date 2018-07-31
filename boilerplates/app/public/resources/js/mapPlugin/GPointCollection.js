 var GMapLib = window.GMapLib = GMapLib || {};
 (function() {
    //所有size的集合
    var sizeAll = {tiny: 2,smaller: 4,small: 8,normal: 10,big: 16,bigger: 20,huge: 30};
    var img = new Image();
    img.src = 'http://api0.map.bdimg.com/images/point-collection/red-marker-10x13.png';
    img.style.display = 'none';
    if(document.body.append){
        document.body.append(img);
    }else{
        document.body.appendChild(img);
    }
    var PointCollection  = GMapLib.PointCollection = function (pixels,opts) {
        //大小
        this.size = matchingSize('small');
        //形状
        this.shape = 'circle';
        //颜色
        this.color = '#d340c3';
        //宽高
        this.width = 300;
        this.height = 300;
        this.pixels = pixels || [];
        this.mapId = '';
        this.initialize(opts);
        this.setPixels(pixels);
        //canvas对象
        var cvs = this.cvs = document.createElement('canvas');
        cvs.width = this.width;
        cvs.height = this.height;
        cvs.style.position = 'absolute';
        cvs.style.top = '0px';
        cvs.style.left = '0px';
        //添加到地图中创建的dom中
        $('#'+(this.mapId?(this.mapId+'_'):'')+'vtx_gmap_html_pointCollection').append(cvs);
        //获取画笔对象
        this.context = cvs.getContext("2d");
        return this;
    }
    PointCollection.prototype.initialize = function (opts) {
        opts = opts || {};
        //大小
        this.size = matchingSize(opts.size) || this.size;
        //形状
        this.shape = opts.shape || this.shape;
        //颜色
        this.color = opts.color || this.color;
        //宽高
        this.width = opts.width || this.width;
        this.height = opts.height || this.height;
        this.mapId = opts.mapId || this.mapId;
    }
    PointCollection.prototype.setPixels = function (pixels){
        //位置
        this.pixels = pixels || this.pixels;
    }
    //绘制canvas
    PointCollection.prototype.draw = function () {
        //判断绘制的图形
        switch (this.shape){
            case 'circle':
                //绘制海量点
                for(var i = 0; i < this.pixels.length ; i++){
                    this.drawCircle(this.pixels[i][0],this.pixels[i][1]);
                }
            break;
            case 'star':
                //绘制海量点
                for(var i = 0; i < this.pixels.length ; i++){
                    this.drawStar(this.pixels[i][0],this.pixels[i][1]);
                }
            break;
            case 'square':
                //绘制海量点
                for(var i = 0; i < this.pixels.length ; i++){
                    this.drawSquare(this.pixels[i][0],this.pixels[i][1]);
                }
            break;
            case 'rhombus':
                //绘制海量点
                for(var i = 0; i < this.pixels.length ; i++){
                    this.drawRhombus(this.pixels[i][0],this.pixels[i][1]);
                }
            break;
            case 'waterdrop':
                //绘制海量点
                for(var i = 0; i < this.pixels.length ; i++){
                    this.drawWaterDrop(this.pixels[i][0],this.pixels[i][1]);
                }
            break;
        }
    }
    //刷新绘制
    PointCollection.prototype.reDraw = function(pixels,opts){
        //设置数据
        this.initialize(opts);
        this.setPixels(pixels);
        //刷新canvas
        this.cvs.width = this.width;
        this.cvs.height = this.height;
        //重新绘制
        this.draw();
    }
    //清空
    PointCollection.prototype.clear = function () {
        //删除canvas dom
        this.cvs.remove();
    }
    //绘制五角星
    PointCollection.prototype.drawStar = function (x,y) {
        var R = this.size/2,
            r = Math.sin(Math.PI / 10) / Math.cos(Math.PI / 5)*R;
        //开始绘制
        this.context.beginPath();
        //先转到开始的第一个点...避免走形
        this.context.moveTo(Math.cos(18/180*Math.PI)*R+x,-Math.sin(18/180*Math.PI)*R+y);  
        //开始绘制
        for(var i = 0; i < 5 ; i++){
            this.context.lineTo(Math.cos((18+i*72)/180*Math.PI)*R+x,-Math.sin((18+i*72)/180*Math.PI)*R+y);  
            this.context.lineTo(Math.cos((54+i*72)/180*Math.PI)*r+x,-Math.sin((54+i*72)/180*Math.PI)*r+y);
        }
        //关闭绘制
        this.context.closePath();
        //设置边框样式以及填充颜色  
        this.context.lineWidth="1";
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
        this.context.fill();
        this.context.stroke();
    }
    //绘制菱形
    PointCollection.prototype.drawRhombus = function (x,y) {
        //开始绘制
        this.context.beginPath();
        //先转到开始的第一个点...避免走形
        this.context.moveTo(x,y-this.size/2);
        //开始绘制
        this.context.lineTo(x,y-this.size/2);
        this.context.lineTo(x+this.size/2,y);
        this.context.lineTo(x,y+this.size/2);
        this.context.lineTo(x-this.size/2,y);
        //关闭绘制
        this.context.closePath();
        //设置边框样式以及填充颜色  
        this.context.lineWidth="1";  
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color; 
        this.context.fill(); 
        this.context.stroke();
    }
    //绘制方形
    PointCollection.prototype.drawSquare = function (x,y) {
        //开始绘制
        this.context.beginPath();
        //先转到开始的第一个点...避免走形
        this.context.moveTo(x-this.size/2,y-this.size/2);
        //开始绘制
        this.context.lineTo(x-this.size/2,y-this.size/2);
        this.context.lineTo(x+this.size/2,y-this.size/2);
        this.context.lineTo(x+this.size/2,y+this.size/2);
        this.context.lineTo(x-this.size/2,y+this.size/2);
        //关闭绘制
        this.context.closePath();
        //设置边框样式以及填充颜色  
        this.context.lineWidth="1";
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
        this.context.fill();
        this.context.stroke();
    }
    //绘制圆
    PointCollection.prototype.drawCircle = function (x,y) {
        //开始绘制
        this.context.beginPath();
        //先转到开始的第一个点...避免走形
        this.context.moveTo(x,y);
        //开始绘制
        this.context.arc(x,y,this.size/2,0,Math.PI*2,true);
        //关闭绘制
        this.context.closePath();
        this.context.strokeStyle = this.color; 
        this.context.fill();
    }
    //绘制水滴
    PointCollection.prototype.drawWaterDrop= function (x,y) {
        //图片位置是单独的 不影响画布其他位置
        this.context.drawImage(img,x-5,y-13,10,13);
    }
    //返回图形的大小
    function matchingSize(size){
        return sizeAll[size];
    }
 })()