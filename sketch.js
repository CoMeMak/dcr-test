
var rotX = 0, rotY = 0;
var M = [], T; //six frames

var kr, degs;

function setup() {
	createCanvas(1000, 1000, WEBGL);
	degs = [0, -90, 90, 0, 0, 0];
	var a = [25, 455, 35, 0, 0, 0];     //DH parameters
    var d = [400, 0, 0, 420, 0, 80];  
	kr = new kinematik.Robot(a, d);
    T=kr.forwardSequence([0, 0, 0, 0, 0, 0]);//only for displaying arms
    for (var i=0; i<6; i++)
	{		
		T[i]= kr.inverse34(T[i]);
	}
	M=kr.forwardSequence(degs);
}

function draw() {
	
	background(255);
	smooth();
	lights(); 
//    directionalLight(51, 102, 126, -1, 0, 0);
//    noStroke();
	//directionalLight(102, 102, 102, 0, 0, -1);
	//ambientLight(102, 102, 102);
	directionalLight(250, 250, 250, -rotX, -rotY, -1);
	//lights();
	//ambientMaterial(70, 130, 230);
    rotateX(rotX);
    rotateY(rotY);
    scale(-0.5);

	for (var i = 0; i < 7; i++)
	{
		//model(arms[i]);  //load arm geometry
	}
	
	ik();
	drawArms();
    //model(base);
   
    
}

var count = 0;
function ik()
{
  //double[] a = { 260, 680, -35, 0, 0, 0};     //here are the parameters of KUKA KR16  
  //double[] d = { 675, 0, 0, 670, 0, 158}; 
  //Robot kr=new Robot(a, d);
  var tool = kr.matrix(0, 0, 0, 0, 0, 0);//set tool by XYZABC (coordinates and Euler angles)
  //use the flange frame by setting tool= null
  //double[][] base = Robot.matrix(898.094, -1265.699, 245.752, 161.956, -11, 22); //set base
  var base = kr.matrix(0,0,0,0,0,0); //set base
  //use the World frame by setting base= null
  var x = parseFloat(count) * 0.5;
  var y = parseFloat(count) * 0.5;
  var z = parseFloat(count) * 0.5;
  count++;
  var XYZABC = [ x, y, z, 0, 0, 180 ];   //coordinates and Euler angles
  var degs = kr.inverse(XYZABC, 0, base, tool);
  M=kr.forwardSequence(degs);
}


function drawArms(){
  noStroke();
  var arm = arms[0];
  beginShape(TRIANGLES);
  for (var i = 0; i < arm.length; i++) {
    var v = arm[i];
    vertex(v[0], v[1], v[2]);
  }
  endShape();

  for (var j=1; j<7; j++) {
    if (j % 2 == 1)
      fill(255, 80, 0);
    else
      fill(200);
    var mat = kinematik.Robot.mul34(M[j-1], T[j-1]);
    arm = arms[j];
    beginShape(TRIANGLES);
    for (var i = 0; i < arm.length; i++) {
      var v = arm[i];
      var v2 = mul34(mat, [v[0], v[1], v[2]]);
      vertex(v2[0], v2[1], v2[2]);
    }
    endShape();
  }
}


function mul34(a, b) {  //3*4 matrix
  var re = [];
  for (var i = 0; i < 3; i++)
    re[i] = parseFloat(a[i][0] * b[0] + a[i][1] * b[1] + a[i][2] * b[2]+a[i][3]);
  return re;
}


function mouseDragged(){
    rotY -= (mouseX - pmouseX) * 0.01;
    rotX -= (mouseY - pmouseY) * 0.01;
}



