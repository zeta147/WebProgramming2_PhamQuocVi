function getArea(width, height){
    const area = width * height;
    console.log(area);
    return area;
}

function getVolume(width, height, lenght){
    volume = width * height * lenght;
    return volume;
}

function doCal(){
    const width = parseFloat(document.getElementById("widthTextBox").value);
    const height = parseFloat(document.getElementById("heightTextBox").value);
    const length = parseFloat(document.getElementById("lengthTextBox").value);
    if(isNaN(length)){    
        const result = getAre(width, height);
        document.getElementById("result").innerHTML += "The volume of the rectangle width=" + 
        width +" by height="+ 
        height + " and length=" + 
        length+ " is " + 
        result + "<br>";
    }
    else{
        const result = getVolume(width, height, length);
        document.getElementById("result").innerHTML += "The volume of the rectangle width=" + 
        width +" by height="+ 
        height + " and length=" + 
        length+ " is " + 
        result + "<br>";
    }


}


