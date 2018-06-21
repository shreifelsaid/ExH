function pdbFileReader(fileLines){
    var xyzText = new Array();
    
    for(var i = 0; i<fileLines.length; i++){
        
        fileLines[i]= fileLines[i].split('');
        // console.log(fileLines[i]);
        if(fileLines[i][0]=="A"&&fileLines[i][1]=="T"&&fileLines[i][2]=="O"&&fileLines[i][3]=="M"){
                
                var xyzString = fileLines[i].slice(77,78)+" "+fileLines[i].slice(32,38)+" "+fileLines[i].slice(40,46)+" "+fileLines[i].slice(49,54);
                xyzString = xyzString.replace(/,/g, '');
                xyzText.push(xyzString);
            
        }
        
    }
    console.log(xyzText);

    return xyzText;

}