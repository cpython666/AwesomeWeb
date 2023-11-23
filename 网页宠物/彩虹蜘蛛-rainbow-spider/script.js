!function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i}({1:[function(require,module,exports){var VerletJS=require("./verlet");var constraint=require("./constraint");require("./objects");window.Vec2=require("./vec2");window.VerletJS=VerletJS;window.Particle=VerletJS.Particle;window.DistanceConstraint=constraint.DistanceConstraint;window.PinConstraint=constraint.PinConstraint;window.AngleConstraint=constraint.AngleConstraint},{"./verlet":2,"./constraint":3,"./objects":4,"./vec2":5}],3:[function(require,module,exports){exports.DistanceConstraint=DistanceConstraint;exports.PinConstraint=PinConstraint;exports.AngleConstraint=AngleConstraint;function DistanceConstraint(a,b,stiffness,distance){this.a=a;this.b=b;this.distance=typeof distance!="undefined"?distance:a.pos.sub(b.pos).length();this.stiffness=stiffness}DistanceConstraint.prototype.relax=function(stepCoef){var normal=this.a.pos.sub(this.b.pos);var m=normal.length2();normal.mutableScale((this.distance*this.distance-m)/m*this.stiffness*stepCoef);this.a.pos.mutableAdd(normal);this.b.pos.mutableSub(normal)};DistanceConstraint.prototype.draw=function(ctx){ctx.beginPath();ctx.moveTo(this.a.pos.x,this.a.pos.y);ctx.lineTo(this.b.pos.x,this.b.pos.y);ctx.strokeStyle="#d8dde2";ctx.stroke()};function PinConstraint(a,pos){this.a=a;this.pos=(new Vec2).mutableSet(pos)}PinConstraint.prototype.relax=function(stepCoef){this.a.pos.mutableSet(this.pos)};PinConstraint.prototype.draw=function(ctx){ctx.beginPath();ctx.arc(this.pos.x,this.pos.y,6,0,2*Math.PI);ctx.fillStyle="rgba(0,153,255,0.1)";ctx.fill()};function AngleConstraint(a,b,c,stiffness){this.a=a;this.b=b;this.c=c;this.angle=this.b.pos.angle2(this.a.pos,this.c.pos);this.stiffness=stiffness}AngleConstraint.prototype.relax=function(stepCoef){var angle=this.b.pos.angle2(this.a.pos,this.c.pos);var diff=angle-this.angle;if(diff<=-Math.PI)diff+=2*Math.PI;else if(diff>=Math.PI)diff-=2*Math.PI;diff*=stepCoef*this.stiffness;this.a.pos=this.a.pos.rotate(this.b.pos,diff);this.c.pos=this.c.pos.rotate(this.b.pos,-diff);this.b.pos=this.b.pos.rotate(this.a.pos,diff);this.b.pos=this.b.pos.rotate(this.c.pos,-diff)};AngleConstraint.prototype.draw=function(ctx){ctx.beginPath();ctx.moveTo(this.a.pos.x,this.a.pos.y);ctx.lineTo(this.b.pos.x,this.b.pos.y);ctx.lineTo(this.c.pos.x,this.c.pos.y);var tmp=ctx.lineWidth;ctx.lineWidth=5;ctx.strokeStyle="rgba(255,255,0,0.2)";ctx.stroke();ctx.lineWidth=tmp}},{}],5:[function(require,module,exports){module.exports=Vec2;function Vec2(x,y){this.x=x||0;this.y=y||0}Vec2.prototype.add=function(v){return new Vec2(this.x+v.x,this.y+v.y)};Vec2.prototype.sub=function(v){return new Vec2(this.x-v.x,this.y-v.y)};Vec2.prototype.mul=function(v){return new Vec2(this.x*v.x,this.y*v.y)};Vec2.prototype.div=function(v){return new Vec2(this.x/v.x,this.y/v.y)};Vec2.prototype.scale=function(coef){return new Vec2(this.x*coef,this.y*coef)};Vec2.prototype.mutableSet=function(v){this.x=v.x;this.y=v.y;return this};Vec2.prototype.mutableAdd=function(v){this.x+=v.x;this.y+=v.y;return this};Vec2.prototype.mutableSub=function(v){this.x-=v.x;this.y-=v.y;return this};Vec2.prototype.mutableMul=function(v){this.x*=v.x;this.y*=v.y;return this};Vec2.prototype.mutableDiv=function(v){this.x/=v.x;this.y/=v.y;return this};Vec2.prototype.mutableScale=function(coef){this.x*=coef;this.y*=coef;return this};Vec2.prototype.equals=function(v){return this.x==v.x&&this.y==v.y};Vec2.prototype.epsilonEquals=function(v,epsilon){return Math.abs(this.x-v.x)<=epsilon&&Math.abs(this.y-v.y)<=epsilon};Vec2.prototype.length=function(v){return Math.sqrt(this.x*this.x+this.y*this.y)};Vec2.prototype.length2=function(v){return this.x*this.x+this.y*this.y};Vec2.prototype.dist=function(v){return Math.sqrt(this.dist2(v))};Vec2.prototype.dist2=function(v){var x=v.x-this.x;var y=v.y-this.y;return x*x+y*y};Vec2.prototype.normal=function(){var m=Math.sqrt(this.x*this.x+this.y*this.y);return new Vec2(this.x/m,this.y/m)};Vec2.prototype.dot=function(v){return this.x*v.x+this.y*v.y};Vec2.prototype.angle=function(v){return Math.atan2(this.x*v.y-this.y*v.x,this.x*v.x+this.y*v.y)};Vec2.prototype.angle2=function(vLeft,vRight){return vLeft.sub(this).angle(vRight.sub(this))};Vec2.prototype.rotate=function(origin,theta){var x=this.x-origin.x;var y=this.y-origin.y;return new Vec2(x*Math.cos(theta)-y*Math.sin(theta)+origin.x,x*Math.sin(theta)+y*Math.cos(theta)+origin.y)};Vec2.prototype.toString=function(){return"("+this.x+", "+this.y+")"};function test_Vec2(){var assert=function(label,expression){console.log("Vec2("+label+"): "+(expression==true?"PASS":"FAIL"));if(expression!=true)throw"assertion failed"};assert("equality",new Vec2(5,3).equals(new Vec2(5,3)));assert("epsilon equality",new Vec2(1,2).epsilonEquals(new Vec2(1.01,2.02),.03));assert("epsilon non-equality",!new Vec2(1,2).epsilonEquals(new Vec2(1.01,2.02),.01));assert("addition",new Vec2(1,1).add(new Vec2(2,3)).equals(new Vec2(3,4)));assert("subtraction",new Vec2(4,3).sub(new Vec2(2,1)).equals(new Vec2(2,2)));assert("multiply",new Vec2(2,4).mul(new Vec2(2,1)).equals(new Vec2(4,4)));assert("divide",new Vec2(4,2).div(new Vec2(2,2)).equals(new Vec2(2,1)));assert("scale",new Vec2(4,3).scale(2).equals(new Vec2(8,6)));assert("mutable set",new Vec2(1,1).mutableSet(new Vec2(2,3)).equals(new Vec2(2,3)));assert("mutable addition",new Vec2(1,1).mutableAdd(new Vec2(2,3)).equals(new Vec2(3,4)));assert("mutable subtraction",new Vec2(4,3).mutableSub(new Vec2(2,1)).equals(new Vec2(2,2)));assert("mutable multiply",new Vec2(2,4).mutableMul(new Vec2(2,1)).equals(new Vec2(4,4)));assert("mutable divide",new Vec2(4,2).mutableDiv(new Vec2(2,2)).equals(new Vec2(2,1)));assert("mutable scale",new Vec2(4,3).mutableScale(2).equals(new Vec2(8,6)));assert("length",Math.abs(new Vec2(4,4).length()-5.65685)<=1e-5);assert("length2",new Vec2(2,4).length2()==20);assert("dist",Math.abs(new Vec2(2,4).dist(new Vec2(3,5))-1.4142135)<=1e-6);assert("dist2",new Vec2(2,4).dist2(new Vec2(3,5))==2);var normal=new Vec2(2,4).normal();assert("normal",Math.abs(normal.length()-1)<=1e-5&&normal.epsilonEquals(new Vec2(.4472,.89443),1e-4));assert("dot",new Vec2(2,3).dot(new Vec2(4,1))==11);assert("angle",new Vec2(0,-1).angle(new Vec2(1,0))*(180/Math.PI)==90);assert("angle2",new Vec2(1,1).angle2(new Vec2(1,0),new Vec2(2,1))*(180/Math.PI)==90);assert("rotate",new Vec2(2,0).rotate(new Vec2(1,0),Math.PI/2).equals(new Vec2(1,1)));assert("toString",new Vec2(2,4)=="(2, 4)")}},{}],4:[function(require,module,exports){var VerletJS=require("./verlet");var Particle=VerletJS.Particle;var constraints=require("./constraint");var DistanceConstraint=constraints.DistanceConstraint;VerletJS.prototype.point=function(pos){var composite=new this.Composite;composite.particles.push(new Particle(pos));this.composites.push(composite);return composite};VerletJS.prototype.lineSegments=function(vertices,stiffness){var i;var composite=new this.Composite;for(i in vertices){composite.particles.push(new Particle(vertices[i]));if(i>0)composite.constraints.push(new DistanceConstraint(composite.particles[i],composite.particles[i-1],stiffness))}this.composites.push(composite);return composite};VerletJS.prototype.cloth=function(origin,width,height,segments,pinMod,stiffness){var composite=new this.Composite;var xStride=width/segments;var yStride=height/segments;var x,y;for(y=0;y<segments;++y){for(x=0;x<segments;++x){var px=origin.x+x*xStride-width/2+xStride/2;var py=origin.y+y*yStride-height/2+yStride/2;composite.particles.push(new Particle(new Vec2(px,py)));if(x>0)composite.constraints.push(new DistanceConstraint(composite.particles[y*segments+x],composite.particles[y*segments+x-1],stiffness));if(y>0)composite.constraints.push(new DistanceConstraint(composite.particles[y*segments+x],composite.particles[(y-1)*segments+x],stiffness))}}for(x=0;x<segments;++x){if(x%pinMod==0)composite.pin(x)}this.composites.push(composite);return composite};VerletJS.prototype.tire=function(origin,radius,segments,spokeStiffness,treadStiffness){var stride=2*Math.PI/segments;var i;var composite=new this.Composite;for(i=0;i<segments;++i){var theta=i*stride;composite.particles.push(new Particle(new Vec2(origin.x+Math.cos(theta)*radius,origin.y+Math.sin(theta)*radius)))}var center=new Particle(origin);composite.particles.push(center);for(i=0;i<segments;++i){composite.constraints.push(new DistanceConstraint(composite.particles[i],composite.particles[(i+1)%segments],treadStiffness));composite.constraints.push(new DistanceConstraint(composite.particles[i],center,spokeStiffness));composite.constraints.push(new DistanceConstraint(composite.particles[i],composite.particles[(i+5)%segments],treadStiffness))}this.composites.push(composite);return composite}},{"./verlet":2,"./constraint":3}],2:[function(require,module,exports){window.requestAnimFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1e3/60)};var Vec2=require("./vec2");exports=module.exports=VerletJS;exports.Particle=Particle;exports.Composite=Composite;function Particle(pos){this.pos=(new Vec2).mutableSet(pos);this.lastPos=(new Vec2).mutableSet(pos)}Particle.prototype.draw=function(ctx){ctx.beginPath();ctx.arc(this.pos.x,this.pos.y,2,0,2*Math.PI);ctx.fillStyle="#2dad8f";ctx.fill()};function VerletJS(width,height,canvas){this.width=width;this.height=height;this.canvas=canvas;this.ctx=canvas.getContext("2d");this.mouse=new Vec2(0,0);this.mouseDown=false;this.draggedEntity=null;this.selectionRadius=20;this.highlightColor="#4f545c";this.bounds=function(particle){if(particle.pos.y>this.height-1)particle.pos.y=this.height-1;if(particle.pos.x<0)particle.pos.x=0;if(particle.pos.x>this.width-1)particle.pos.x=this.width-1};var _this=this;this.canvas.oncontextmenu=function(e){e.preventDefault()};this.canvas.onmousedown=function(e){_this.mouseDown=true;var nearest=_this.nearestEntity();if(nearest){_this.draggedEntity=nearest}};this.canvas.onmouseup=function(e){_this.mouseDown=false;_this.draggedEntity=null};this.canvas.onmousemove=function(e){var rect=_this.canvas.getBoundingClientRect();_this.mouse.x=e.clientX-rect.left;_this.mouse.y=e.clientY-rect.top};this.gravity=new Vec2(0,.2);this.friction=.99;this.groundFriction=.8;this.composites=[]}VerletJS.prototype.Composite=Composite;function Composite(){this.particles=[];this.constraints=[];this.drawParticles=null;this.drawConstraints=null}Composite.prototype.pin=function(index,pos){pos=pos||this.particles[index].pos;var pc=new PinConstraint(this.particles[index],pos);this.constraints.push(pc);return pc};VerletJS.prototype.frame=function(step){var i,j,c;for(c in this.composites){for(i in this.composites[c].particles){var particles=this.composites[c].particles;var velocity=particles[i].pos.sub(particles[i].lastPos).scale(this.friction);if(particles[i].pos.y>=this.height-1&&velocity.length2()>1e-6){var m=velocity.length();velocity.x/=m;velocity.y/=m;velocity.mutableScale(m*this.groundFriction)}particles[i].lastPos.mutableSet(particles[i].pos);particles[i].pos.mutableAdd(this.gravity);particles[i].pos.mutableAdd(velocity)}}if(this.draggedEntity)this.draggedEntity.pos.mutableSet(this.mouse);var stepCoef=1/step;for(c in this.composites){var constraints=this.composites[c].constraints;for(i=0;i<step;++i)for(j in constraints)constraints[j].relax(stepCoef)}for(c in this.composites){var particles=this.composites[c].particles;for(i in particles)this.bounds(particles[i])}};VerletJS.prototype.draw=function(){var i,c;this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);for(c in this.composites){if(this.composites[c].drawConstraints){this.composites[c].drawConstraints(this.ctx,this.composites[c])}else{var constraints=this.composites[c].constraints;for(i in constraints)constraints[i].draw(this.ctx)}if(this.composites[c].drawParticles){this.composites[c].drawParticles(this.ctx,this.composites[c])}else{var particles=this.composites[c].particles;for(i in particles)particles[i].draw(this.ctx)}}var nearest=this.draggedEntity||this.nearestEntity();if(nearest){this.ctx.beginPath();this.ctx.arc(nearest.pos.x,nearest.pos.y,8,0,2*Math.PI);this.ctx.strokeStyle=this.highlightColor;this.ctx.stroke()}};VerletJS.prototype.nearestEntity=function(){var c,i;var d2Nearest=0;var entity=null;var constraintsNearest=null;for(c in this.composites){var particles=this.composites[c].particles;for(i in particles){var d2=particles[i].pos.dist2(this.mouse);if(d2<=this.selectionRadius*this.selectionRadius&&(entity==null||d2<d2Nearest)){entity=particles[i];constraintsNearest=this.composites[c].constraints;d2Nearest=d2}}}for(i in constraintsNearest)if(constraintsNearest[i]instanceof PinConstraint&&constraintsNearest[i].a==entity)entity=constraintsNearest[i];return entity}},{"./vec2":5}]},{},[1]);

function getViewport() {

 var viewPortWidth;
 var viewPortHeight;

 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
 if (typeof window.innerWidth != 'undefined') {
   viewPortWidth = window.innerWidth,
   viewPortHeight = window.innerHeight
 }

// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
 else if (typeof document.documentElement != 'undefined'
 && typeof document.documentElement.clientWidth !=
 'undefined' && document.documentElement.clientWidth != 0) {
    viewPortWidth = document.documentElement.clientWidth,
    viewPortHeight = document.documentElement.clientHeight
 }

 // older versions of IE
 else {
   viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
   viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
 }
 return [viewPortWidth, viewPortHeight];
}

VerletJS.prototype.spider = function(origin) {
		var i;
		var legSeg1Stiffness = 0.99;
		var legSeg2Stiffness = 0.99;
		var legSeg3Stiffness = 0.99;
		var legSeg4Stiffness = 0.99;
		
		var joint1Stiffness = 1;
		var joint2Stiffness = 0.4;
		var joint3Stiffness = 0.9;
		
		var bodyStiffness = 1;
		var bodyJointStiffness = 1;
		
		var composite = new this.Composite();
		composite.legs = [];
		
		
		composite.thorax = new Particle(origin);
		composite.head = new Particle(origin.add(new Vec2(0,-5)));
		composite.abdomen = new Particle(origin.add(new Vec2(0,10)));
		
		composite.particles.push(composite.thorax);
		composite.particles.push(composite.head);
		composite.particles.push(composite.abdomen);
		
		composite.constraints.push(new DistanceConstraint(composite.head, composite.thorax, bodyStiffness));
		
		
		composite.constraints.push(new DistanceConstraint(composite.abdomen, composite.thorax, bodyStiffness));
		composite.constraints.push(new AngleConstraint(composite.abdomen, composite.thorax, composite.head, 0.4));
		
		
		// legs
		for (i=0;i<4;++i) {
			composite.particles.push(new Particle(composite.particles[0].pos.add(new Vec2(3,(i-1.5)*3))));
			composite.particles.push(new Particle(composite.particles[0].pos.add(new Vec2(-3,(i-1.5)*3))));
			
			var len = composite.particles.length;
			
			composite.constraints.push(new DistanceConstraint(composite.particles[len-2], composite.thorax, legSeg1Stiffness));
			composite.constraints.push(new DistanceConstraint(composite.particles[len-1], composite.thorax, legSeg1Stiffness));
			
			
			var lenCoef = 1;
			if (i == 1 || i == 2)
				lenCoef = 0.7;
			else if (i == 3)
				lenCoef = 0.9;
			
			composite.particles.push(new Particle(composite.particles[len-2].pos.add((new Vec2(20,(i-1.5)*30)).normal().mutableScale(20*lenCoef))));
			composite.particles.push(new Particle(composite.particles[len-1].pos.add((new Vec2(-20,(i-1.5)*30)).normal().mutableScale(20*lenCoef))));
			
			len = composite.particles.length;
			composite.constraints.push(new DistanceConstraint(composite.particles[len-4], composite.particles[len-2], legSeg2Stiffness));
			composite.constraints.push(new DistanceConstraint(composite.particles[len-3], composite.particles[len-1], legSeg2Stiffness));
			
			composite.particles.push(new Particle(composite.particles[len-2].pos.add((new Vec2(20,(i-1.5)*50)).normal().mutableScale(20*lenCoef))));
			composite.particles.push(new Particle(composite.particles[len-1].pos.add((new Vec2(-20,(i-1.5)*50)).normal().mutableScale(20*lenCoef))));
			
			len = composite.particles.length;
			composite.constraints.push(new DistanceConstraint(composite.particles[len-4], composite.particles[len-2], legSeg3Stiffness));
			composite.constraints.push(new DistanceConstraint(composite.particles[len-3], composite.particles[len-1], legSeg3Stiffness));
			
			
			var rightFoot = new Particle(composite.particles[len-2].pos.add((new Vec2(20,(i-1.5)*100)).normal().mutableScale(12*lenCoef)));
			var leftFoot = new Particle(composite.particles[len-1].pos.add((new Vec2(-20,(i-1.5)*100)).normal().mutableScale(12*lenCoef)))
			composite.particles.push(rightFoot);
			composite.particles.push(leftFoot);
			
			composite.legs.push(rightFoot);
			composite.legs.push(leftFoot);
			
			len = composite.particles.length;
			composite.constraints.push(new DistanceConstraint(composite.particles[len-4], composite.particles[len-2], legSeg4Stiffness));
			composite.constraints.push(new DistanceConstraint(composite.particles[len-3], composite.particles[len-1], legSeg4Stiffness));
			
			
			composite.constraints.push(new AngleConstraint(composite.particles[len-6], composite.particles[len-4], composite.particles[len-2], joint3Stiffness));
			composite.constraints.push(new AngleConstraint(composite.particles[len-6+1], composite.particles[len-4+1], composite.particles[len-2+1], joint3Stiffness));
			
			composite.constraints.push(new AngleConstraint(composite.particles[len-8], composite.particles[len-6], composite.particles[len-4], joint2Stiffness));
			composite.constraints.push(new AngleConstraint(composite.particles[len-8+1], composite.particles[len-6+1], composite.particles[len-4+1], joint2Stiffness));
			
			composite.constraints.push(new AngleConstraint(composite.particles[0], composite.particles[len-8], composite.particles[len-6], joint1Stiffness));
			composite.constraints.push(new AngleConstraint(composite.particles[0], composite.particles[len-8+1], composite.particles[len-6+1], joint1Stiffness));
			
			composite.constraints.push(new AngleConstraint(composite.particles[1], composite.particles[0], composite.particles[len-8], bodyJointStiffness));
			composite.constraints.push(new AngleConstraint(composite.particles[1], composite.particles[0], composite.particles[len-8+1], bodyJointStiffness));
		}
		
		this.composites.push(composite);
		return composite;
	}
	
	VerletJS.prototype.spiderweb = function(origin, radius, segments, depth) {
		var stiffness = 0.6;
		var tensor = 0.3;
		var stride = (2*Math.PI)/segments;
		var n = segments*depth;
		var radiusStride = radius/n;
		var i, c;

		var composite = new this.Composite();

		// particles
		for (i=0;i<n;++i) {
			var theta = i*stride + Math.cos(i*0.4)*0.05 + Math.cos(i*0.05)*0.2;
			var shrinkingRadius = radius - radiusStride*i + Math.cos(i*0.1)*20;
			
			var offy = Math.cos(theta*2.1)*(radius/depth)*0.2;
			composite.particles.push(new Particle(new Vec2(origin.x + Math.cos(theta)*shrinkingRadius, origin.y + Math.sin(theta)*shrinkingRadius + offy)));
		}
		
		for (i=0;i<segments;i+=4)
			composite.pin(i);

		// constraints
		for (i=0;i<n-1;++i) {
			// neighbor
			composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[i+1], stiffness));
			
			// span rings
			var off = i + segments;
			if (off < n-1)
				composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[off], stiffness));
			else
				composite.constraints.push(new DistanceConstraint(composite.particles[i], composite.particles[n-1], stiffness));
		}
		
		
		composite.constraints.push(new DistanceConstraint(composite.particles[0], composite.particles[segments-1], stiffness));
		
		for (c in composite.constraints)
			composite.constraints[c].distance *= tensor;

		this.composites.push(composite);
		return composite;
	}
	
	//+ Jonas Raoni Soares Silva
	//@ http://jsfromhell.com/array/shuffle [v1.0]
	function shuffle(o) { //v1.0
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}
	
	VerletJS.prototype.crawl = function(leg) {
		
		var stepRadius = 100;
		var minStepRadius = 35;
		
		var spiderweb = this.composites[0];
		var spider = this.composites[1];
		
		var theta = spider.particles[0].pos.angle2(spider.particles[0].pos.add(new Vec2(1,0)), spider.particles[1].pos);

		var boundry1 = (new Vec2(Math.cos(theta), Math.sin(theta)));
		var boundry2 = (new Vec2(Math.cos(theta+Math.PI/2), Math.sin(theta+Math.PI/2)));
		
		
		var flag1 = leg < 4 ? 1 : -1;
		var flag2 = leg%2 == 0 ? 1 : 0;
		
		var paths = [];
		
		var i;
		for (i in spiderweb.particles) {
			if (
				spiderweb.particles[i].pos.sub(spider.particles[0].pos).dot(boundry1)*flag1 >= 0
				&& spiderweb.particles[i].pos.sub(spider.particles[0].pos).dot(boundry2)*flag2 >= 0
			) {
				var d2 = spiderweb.particles[i].pos.dist2(spider.particles[0].pos);
				
				if (!(d2 >= minStepRadius*minStepRadius && d2 <= stepRadius*stepRadius))
					continue;

				var leftFoot = false;
				var j;
				for (j in spider.constraints) {
					var k;
					for (k=0;k<8;++k) {
						if (
							spider.constraints[j] instanceof DistanceConstraint
							&& spider.constraints[j].a == spider.legs[k]
							&& spider.constraints[j].b == spiderweb.particles[i])
						{
							leftFoot = true;
						}
					}
				}
				
				if (!leftFoot)
					paths.push(spiderweb.particles[i]);
			}
		}
		
		for (i in spider.constraints) {
			if (spider.constraints[i] instanceof DistanceConstraint && spider.constraints[i].a == spider.legs[leg]) {
				spider.constraints.splice(i, 1);
				break;
			}
		}
		
		if (paths.length > 0) {
			shuffle(paths);
			spider.constraints.push(new DistanceConstraint(spider.legs[leg], paths[0], 1, 0));
		}
	}
	
	window.onload = function() {
		var canvas = document.getElementById("web");

		// canvas dimensions
		var width = getViewport()[0] - 50;
		var height = getViewport()[1] - 50;

		// retina
		//var dpr = window.devicePixelRatio || 1;
    var dpr = 1;
		canvas.width = width*dpr;
		canvas.height = height*dpr;
		canvas.getContext("2d").scale(dpr, dpr);

		// simulation
		var sim = new VerletJS(width, height, canvas);
		
		// entities
		var spiderweb = sim.spiderweb(new Vec2(width/2,height/2), Math.min(width, height)/2, 20, 7);

		var spider = sim.spider(new Vec2(width/2,-300));    
		
		
		spiderweb.drawParticles = function(ctx, composite) {
			var i;
			for (i in composite.particles) {
				var point = composite.particles[i];
				ctx.beginPath();
				ctx.arc(point.pos.x, point.pos.y, 1.3, 0, 2*Math.PI);
				ctx.fillStyle = "#7AA"; 
        
        //"#" + Math.random().toString(16).slice(2, 8);
        
				ctx.fill();
			}
		}
			
			
		spider.drawConstraints = function(ctx, composite) {
			var i;

			ctx.beginPath();
			ctx.arc(spider.head.pos.x, spider.head.pos.y, 4, 0, 2*Math.PI);
			ctx.fillStyle = getColor(1);
			ctx.fill();
			
			ctx.beginPath();
			ctx.arc(spider.thorax.pos.x, spider.thorax.pos.y, 4, 0, 2*Math.PI);
			ctx.fill();
			
			ctx.beginPath();
			ctx.arc(spider.abdomen.pos.x, spider.abdomen.pos.y, 8, 0, 2*Math.PI);
			ctx.fill();
			
			for (i=3;i<composite.constraints.length;++i) {
				var constraint = composite.constraints[i];
				if (constraint instanceof DistanceConstraint) {
					ctx.beginPath();
					ctx.moveTo(constraint.a.pos.x, constraint.a.pos.y);
					ctx.lineTo(constraint.b.pos.x, constraint.b.pos.y);
					
					// draw legs
					if (
						(i >= 2 && i <= 4)
						|| (i >= (2*9)+1 && i <= (2*9)+2)
						|| (i >= (2*17)+1 && i <= (2*17)+2)
						|| (i >= (2*25)+1 && i <= (2*25)+2)
					) {
						ctx.save();
						constraint.draw(ctx);
						ctx.strokeStyle = getColor(2);
						ctx.lineWidth = 3;
						ctx.stroke();
						ctx.restore();
					} else if (
						(i >= 4 && i <= 6)
						|| (i >= (2*9)+3 && i <= (2*9)+4)
						|| (i >= (2*17)+3 && i <= (2*17)+4)
						|| (i >= (2*25)+3 && i <= (2*25)+4)
					) {
						ctx.save();
						constraint.draw(ctx);
						ctx.strokeStyle = getColor(3);
						ctx.lineWidth = 2;
						ctx.stroke();
						ctx.restore();
					} else if (
						(i >= 6 && i <= 8)
						|| (i >= (2*9)+5 && i <= (2*9)+6)
						|| (i >= (2*17)+5 && i <= (2*17)+6)
						|| (i >= (2*25)+5 && i <= (2*25)+6)
					) {
						ctx.save();
						ctx.strokeStyle = getColor(4);
						ctx.lineWidth = 1.5;
						ctx.stroke();
						ctx.restore();
					} else {
						ctx.strokeStyle = getColor(5);
						ctx.stroke();
					}
				}
			}
		}
		
		spider.drawParticles = function(ctx, composite) {
		}
		
		// animation loop
		var legIndex = 0;
		var loop = function() {
        ti++;
        
			if (Math.floor(Math.random()*4) == 0) {
				sim.crawl(((legIndex++)*3)%8);
			}
			
			sim.frame(16);
			sim.draw();
			requestAnimFrame(loop);
		};

		loop();
	};
  
  var ti = 0;
  var tc = [
    ["#661111","#661111","#4D1A1A","#332222","#1A2B2B"], //red
    ["#663311","#663311","#4D2A1A","#333022","#1A1A2B"], //orange
    ["#666611","#666611","#4D4D1A","#333322","#1A1A2B"], //yellow
    ["#116611","#116611","#1A4D1A","#223322","#2B1A2B"], //green
    ["#111166","#111166","#1A1A4D","#222233","#2B2B1A"], //blue
    ["#661166","#661166","#4D1A4D","#332233","#1A2B1A"], //purple
    ["#111166","#111166","#1A1A4D","#222233","#2B2B1A"], //blue
    ["#116611","#116611","#1A4D1A","#223322","#2B1A2B"], //green
    ["#666611","#666611","#4D4D1A","#333322","#1A1A2B"], //yellow
    ["#663311","#663311","#4D2A1A","#333022","#1A1A2B"], //orange
    ["#661111","#661111","#4D1A1A","#332222","#1A2B2B"] //red
  ];
  
  function getColor(part) {
    var col = "#661111";
    
    if (ti >= 999) {
      ti = 0;
    }
    
    var ts = Math.floor(ti/100);
    var ta = 200 - ((ti%100) * 2);
    
  switch (part) {
    case 1: col = shadeColor(tc[ts][0], ta); break;
    case 2: col = shadeColor(tc[ts][1], ta); break;
    case 3: col = shadeColor(tc[ts][2], ta); break;
    case 4: col = shadeColor(tc[ts][3], ta); break;
    case 5: col = shadeColor(tc[ts][4], ta); break;
  }
  return col;
}

function shadeColor(color, shade) {
    var colorInt = parseInt(color.substring(1),16);

    var R = (colorInt & 0xFF0000) >> 16;
    var G = (colorInt & 0x00FF00) >> 8;
    var B = (colorInt & 0x0000FF) >> 0;

    R = R + Math.floor((shade/255)*R);
    G = G + Math.floor((shade/255)*G);
    B = B + Math.floor((shade/255)*B);

    var newColorInt = (R<<16) + (G<<8) + (B);
    var newColorStr = "#"+newColorInt.toString(16);

    return newColorStr;
}