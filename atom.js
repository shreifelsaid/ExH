class atom {
    
    constructor(Sym, x=0,y=0,z=0){
        this.S = Sym;
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = colorSize(Sym);
        this.Basis = constructBasis(Sym,atomParam);
        this.eStructure = getEStructure(Sym,eStructure);
        this.radius = getRadius(Sym,atomRadius);
        this.Z = this.Basis[0][1];
        //zeff 
        let zeff = [];
        for (var i=0;i<this.Basis.length;i++){
            //console.log(this.Basis[i][4]+this.Basis[i][5]);
            zeff.push(calZeff(1,this.Basis[i][4]+this.Basis[i][5],this.eStructure));
        }
        this.zeff = zeff;
        //orbitals
        // read from basis and add orbitals
        let AO = []; 
        for (var i=0;i<this.Basis.length;i++){
            let n = parseInt(this.Basis[i][4]);
            let lsym = this.Basis[i][5];
            if (lsym == "s"){var l = 0;}
            else if (lsym == "p"){var l = 1;}
            else if (lsym == "d"){var l = 2;}
            else if (lsym == "f"){var l = 3;}
            let orbitalZeff = this.zeff[i];
            let orbitalEnergy = parseFloat(this.Basis[i][6]);
            for(var mm=0;mm<2*l+1;mm++){
                let m = mm - l;
                AO.push([n,l,m,orbitalZeff,this.x,this.y,this.z,orbitalEnergy]);
                }
            }
        this.AO = AO;
        
    }

   
}

class molecule {
    constructor(atoms){
        this.atoms = atoms;
        // Create AO basis for molecule 
        let AOs = [];
        for (var i=0;i<this.atoms.length;i++){
            let AO = atoms[i].AO;
            for (var j=0;j<AO.length;j++){
                AOs.push([AO[j],atoms[i].S]);
            }
        }
        // Overlap matrix
        // initialize Sij
        let Sij =  new Array(this.AOs.length);
        for (var i = 0; i < this.AOs.length; i++) {
          Sij[i] = new Array(this.AOs.length);
        }
        // Calculate Sij
        for (var i=0;i<this.AOs.length;i++){
            for (var j=i;j<this.AOs.length;j++){
                //Diagonal
                if (i==j){
                    Sij[i][i] = 1.0;
                }
                //Off diagonal
                else {
                    ao1 = this.AOs[i];
                    ao2 = this.AOs[j];
                    // get coordinate of AOi
                    x1  = ao1[4];
                    y1  = ao1[5];
                    z1  = ao1[6];
                    // Center AOi at origin
                    // Calculate relative position 
                    // of AOj
                    
                }
            }
        }
        this.AOs = AOs;

    }
}



    function createAndPrint(){
            hydrogen = new atom("h", ["1s"]);
            console.log(hydrogen.Symbol);

    }

    function constructBasis(S,Param){
        let Basis = [];
        // find the lines
        for (var i = 0; i<Param.length;i++){
            
            if (Param[i].split(" ")[0] == S.toUpperCase()){
                let B = Param[i].split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
                Basis.push(B);
            }
        }
        
        return Basis;
    }

    var getEStructure= function(S,eS){
        for (var i = 0; i<eS.length;i++){
            if (eS[i][0].toUpperCase() == S.toUpperCase()){
                return eS[i][1];
            }
        }
    }

    var getRadius = function(S,radData){
        for (var i = 0; i<radData.length;i++){
            if (radData[i][0].toUpperCase() == S.toUpperCase()){
                return radData[i][1];
            }
        }

    }
    //;Atomlab AtNo Nvalen Nzeta Nquant Ang  IP       exp1     exp2   coeff1   coeff2

    var atomParam = [
        "H        1      1      1     1     s  -13.600   1.3000   0.0000   1.0000   0.0000",
        "HE       2      2      1     1     s  -23.400   1.6880   0.0000   1.0000   0.0000",
        "LI       3      1      1     2     s   -5.400   0.6500   0.0000   1.0000   0.0000",
        "LI       3      1      1     2     p   -3.500   0.6500   0.0000   1.0000   0.0000",
        "BE       4      2      1     2     s  -10.000   0.9750   0.0000   1.0000   0.0000",
        "BE       4      2      1     2     p   -6.000   0.9750   0.0000   1.0000   0.0000",
        "B        5      3      1     2     s  -15.200   1.3000   0.0000   1.0000   0.0000",
        "B        5      3      1     2     p   -8.500   1.3000   0.0000   1.0000   0.0000",
        "C        6      4      1     2     s  -21.400   1.6250   0.0000   1.0000   0.0000",
        "C        6      4      1     2     p  -11.400   1.6250   0.0000   1.0000   0.0000",
        "N        7      5      1     2     s  -26.000   1.9500   0.0000   1.0000   0.0000",
        "N        7      5      1     2     p  -13.400   1.9500   0.0000   1.0000   0.0000",
        "O        8      6      1     2     s  -32.300   2.2750   0.0000   1.0000   0.0000",
        "O        8      6      1     2     p  -14.800   2.2750   0.0000   1.0000   0.0000",
        "F        9      7      1     2     s  -40.000   2.4250   0.0000   1.0000   0.0000",
        "F        9      7      1     2     p  -18.100   2.4250   0.0000   1.0000   0.0000",
        "NE      10      8      1     2     s  -43.200   2.8790   0.0000   1.0000   0.0000",
        "NE      10      9      1     2     p  -20.000   2.8790   0.0000   1.0000   0.0000",
        "NA      11      1      1     3     s   -5.100   0.7330   0.0000   1.0000   0.0000",
        "NA      11      1      1     3     p   -3.000   0.7330   0.0000   1.0000   0.0000",
        "MG      12      2      1     3     s   -9.000   1.1000   0.0000   1.0000   0.0000",
        "MG      12      2      1     3     p   -4.500   1.1000   0.0000   1.0000   0.0000",
        "AL      13      3      1     3     s  -12.300   1.1670   0.0000   1.0000   0.0000",
        "AL      13      3      1     3     p   -6.500   1.1670   0.0000   1.0000   0.0000",
        "AL      13      3      1     3     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "SI      14      4      1     3     s  -17.300   1.3830   0.0000   1.0000   0.0000",
        "SI      14      4      1     3     p   -9.200   1.3830   0.0000   1.0000   0.0000",
        "P       15      5      1     3     s  -18.600   1.7500   0.0000   1.0000   0.0000",
        "P       15      5      1     3     p  -14.000   1.3000   0.0000   1.0000   0.0000",
        "S       16      6      1     3     s  -20.000   2.1220   0.0000   1.0000   0.0000",
        "S       16      6      1     3     p  -11.000   1.8270   0.0000   1.0000   0.0000",
        "CL      17      7      1     3     s  -26.300   2.1830   0.0000   1.0000   0.0000",
        "CL      17      7      1     3     p  -14.200   1.7330   0.0000   1.0000   0.0000",
        "AR      18      8      1     3     s   -0.0000  0.0000   0.0000   1.0000   0.0000",
        "AR      18      8      1     3     p   -0.0000  0.0000   0.0000   1.0000   0.0000",
        "K       19      1      1     4     s   -4.340   0.8740   0.0000   1.0000   0.0000",
        "K       19      1      1     4     p   -2.730   0.8740   0.0000   1.0000   0.0000",
        "CA      20      2      1     4     s   -7.000   1.2000   0.0000   1.0000   0.0000",
        "CA      20      2      1     4     p   -4.000   1.2000   0.0000   1.0000   0.0000",
        "CA      20      2      1     3     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "SC      21      3      1     4     s   -8.870   1.3000   0.0000   1.0000   0.0000",
        "SC      21      3      1     4     p   -2.750   1.3000   0.0000   1.0000   0.0000",
        "SC      21      3      2     3     d   -8.510   4.3500   1.7000   0.4228   0.7276",
        "TI      22      4      1     4     s   -8.970   1.0750   0.0000   1.0000   0.0000",
        "TI      22      4      1     4     p   -5.440   1.0750   0.0000   1.0000   0.0000",
        "TI      22      4      2     3     d  -10.810   4.5500   1.4000   0.4206   0.7839",
        "V       23      5      1     4     s   -8.810   1.3000   0.0000   1.0000   0.0000",
        "V       23      5      1     4     p   -5.520   1.3000   0.0000   1.0000   0.0000",
        "V       23      5      2     3     d  -11.000   4.7500   1.7000   0.4755   0.7052",
        "CR      24      6      1     4     s   -8.660   1.7000   0.0000   1.0000   0.0000",
        "CR      24      6      1     4     p   -5.240   1.7000   0.0000   1.0000   0.0000",
        "CR      24      6      2     3     d  -11.220   4.9500   1.8000   0.5060   0.6750",
        "MN      25      7      1     4     s   -9.750   0.9700   0.0000   1.0000   0.0000",
        "MN      25      7      1     4     p   -5.890   0.9700   0.0000   1.0000   0.0000",
        "MN      25      7      2     3     d  -11.670   5.1500   1.7000   0.5139   0.6929",
        "FE      26      8      1     4     s   -9.100   1.9000   0.0000   1.0000   0.0000",
        "FE      26      8      1     4     p   -5.320   1.9000   0.0000   1.0000   0.0000",
        "FE      26      8      2     3     d  -12.600   5.3500   2.0000   0.5505   0.6260",
        "CO      27      9      1     4     s   -9.210   2.0000   0.0000   1.0000   0.0000",
        "CO      27      9      1     4     p   -5.290   2.0000   0.0000   1.0000   0.0000",
        "CO      27      9      2     3     d  -13.180   5.5500   2.1000   0.5680   0.6060",
        "NI      28      10     1     4     s  -10.950   2.1000   0.0000   1.0000   0.0000",
        "NI      28      10     1     4     p   -6.270   2.1000   0.0000   1.0000   0.0000",
        "NI      28      10     2     3     d  -14.200   5.7500   2.3000   0.5683   0.6292",
        "CU      29      11     1     4     s  -11.400   2.2000   0.0000   1.0000   0.0000",
        "CU      29      11     1     4     p   -6.060   2.2000   0.0000   1.0000   0.0000",
        "CU      29      11     2     3     d  -14.000   5.9500   2.3000   0.5933   0.5744",
        "ZN      30      12     1     4     s  -12.410   2.0100   0.0000   1.0000   0.0000",
        "ZN      30      12     1     4     p   -6.530   1.7000   0.0000   1.0000   0.0000",
        "GA      31      3      1     4     s  -14.580   1.7700   0.0000   1.0000   0.0000",
        "GA      31      3      1     4     p   -6.750   1.5500   0.0000   1.0000   0.0000",
        "GE      32      4      1     4     s  -16.000   2.1600   0.0000   1.0000   0.0000",
        "GE      32      4      1     4     p   -9.000   1.8500   0.0000   1.0000   0.0000",
        "AS      33      5      1     4     s  -16.220   2.2300   0.0000   1.0000   0.0000",
        "AS      33      5      1     4     p  -12.160   1.8900   0.0000   1.0000   0.0000",
        "SE      34      6      1     4     s  -20.500   2.4400   0.0000   1.0000   0.0000",
        "SE      34      6      1     4     p  -14.400   2.0700   0.0000   1.0000   0.0000",
        "BR      35      7      1     4     s  -22.070   2.5880   0.0000   1.0000   0.0000",
        "BR      35      7      1     4     p  -13.100   2.1310   0.0000   1.0000   0.0000",
        "KR      36      8      1     4     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "KR      36      8      1     4     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "RB      37      1      1     5     s   -4.180   0.9970   0.0000   1.0000   0.0000",
        "RB      37      1      1     5     p   -2.600   0.9970   0.0000   1.0000   0.0000",
        "SR      38      2      1     5     s   -6.620   1.2140   0.0000   1.0000   0.0000",
        "SR      38      2      1     5     p   -3.920   1.2140   0.0000   1.0000   0.0000",
        "SR      38      2      1     4     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "Y       39      3      1     5     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "Y       39      3      1     5     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "Y       39      3      1     4     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ZR      40      4      1     5     s   -9.870   1.8170   0.0000   1.0000   0.0000",
        "ZR      40      4      1     5     p   -6.760   1.7760   0.0000   1.0000   0.0000",
        "ZR      40      4      2     4     d  -11.180   3.8350   1.5050   0.6210   0.5769",
        "NB      41      5      1     5     s  -10.100   1.8900   0.0000   1.0000   0.0000",
        "NB      41      5      1     5     p   -6.860   1.8500   0.0000   1.0000   0.0000",
        "NB      41      5      2     4     d  -12.100   4.0800   1.6400   0.6401   0.5516",
        "MO      42      6      1     5     s   -8.340   1.9600   0.0000   1.0000   0.0000",
        "MO      42      6      1     5     p   -5.240   1.9000   0.0000   1.0000   0.0000",
        "MO      42      6      2     4     d  -10.500   4.5400   1.9000   0.6097   0.6097",
        "TC      43      7      1     5     s  -10.070   2.0180   0.0000   1.0000   0.0000",
        "TC      43      7      1     5     p   -5.400   1.9840   0.0000   1.0000   0.0000",
        "TC      43      7      2     4     d  -12.820   4.9000   2.0940   0.5715   0.6012",
        "RU      44      8      1     5     s  -10.400   2.0800   0.0000   1.0000   0.0000",
        "RU      44      8      1     5     p   -6.870   2.0400   0.0000   1.0000   0.0000",
        "RU      44      8      2     4     d  -14.900   5.3800   2.3000   0.5340   0.6365",
        "RH      45      9      1     5     s   -8.090   2.1350   0.0000   1.0000   0.0000",
        "RH      45      9      1     5     p   -4.570   2.1000   0.0000   1.0000   0.0000",
        "RH      45      9      2     4     d  -12.500   4.2900   1.9700   0.5807   0.5685",
        "PD      46     10      1     5     s   -7.320   2.1900   0.0000   1.0000   0.0000",
        "PD      46     10      1     5     p   -3.750   2.1520   0.0000   1.0000   0.0000",
        "PD      46     10      2     4     d  -12.020   5.9830   2.6130   0.5535   0.6701",
        "AG      47     11      1     5     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AG      47     11      1     5     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AG      47     11      1     4     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CD      48     12      1     5     s  -11.800   1.6400   0.0000   1.0000   0.0000",
        "CD      48     12      1     5     p   -8.200   1.6000   0.0000   1.0000   0.0000",
        "CD      48     12      1     4     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "IN      49     3       1     5     s  -12.600   1.9030   0.0000   1.0000   0.0000",
        "IN      49     3       1     5     p   -6.190   1.6770   0.0000   1.0000   0.0000",
        "SN      50     4       1     5     s  -16.160   2.1200   0.0000   1.0000   0.0000",
        "SN      50     4       1     5     p   -8.320   1.8200   0.0000   1.0000   0.0000",
        "SB      51     5       1     5     s  -18.800   2.3230   0.0000   1.0000   0.0000",
        "SB      51     5       1     5     p  -11.700   1.9990   0.0000   1.0000   0.0000",
        "TE      52     6       1     5     s  -20.800   2.5100   0.0000   1.0000   0.0000",
        "TE      52     6       1     5     p  -14.800   2.1600   0.0000   1.0000   0.0000",
        "I       53     7       1     5     s  -18.000   2.6790   0.0000   1.0000   0.0000",
        "I       53     7       1     5     p  -12.700   2.3220   0.0000   1.0000   0.0000",
        "XE      54     8       1     5     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "XE      54     8       1     5     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CS      55     1       1     6     s   -3.880   1.0600   0.0000   1.0000   0.0000",
        "CS      55     1       1     6     p   -2.490   1.0600   0.0000   1.0000   0.0000",
        "BA      56     2       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "BA      56     2       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "BA      56     2       1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "LA      57     3       1     6     s   -7.670   2.1400   0.0000   1.0000   0.0000",
        "LA      57     3       1     6     p   -5.010   2.0800   0.0000   1.0000   0.0000",
        "LA      57     3       2     5     d   -8.210   3.7800   1.3810   0.7765   0.4586",
        "CE      58     4       1     6     s   -4.970   1.7990   0.0000   1.0000   0.0000",
        "CE      58     4       1     6     p   -4.970   1.7990   0.0000   1.0000   0.0000",
        "CE      58     4       1     5     d   -6.430   2.7470   0.0000   1.0000   0.0000",
        "CE      58     4       1     4     f  -11.280   3.9070   0.0000   1.0000   0.0000",
        "PR      59     5       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PR      59     5       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PR      59     5       1     5     d   -0.000   0.0000   0.0000   0.0000   0.0000",
        "PR      59     5       1     4     f   -0.000   0.0000   0.0000   0.0000   0.0000",
        "ND      60     6       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ND      60     6       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ND      60     6       1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ND      60     6       1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PM      61     7       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PM      61     7       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PM      61     7       1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PM      61     7       1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "SM      62     8       1     6     s   -4.860   1.4000   0.0000   1.0000   0.0000",
        "SM      62     8       1     6     p   -4.860   1.4000   0.0000   1.0000   0.0000",
        "SM      62     8       2     5     d   -6.060   2.7470   1.2670   0.7184   0.4447",
        "SM      62     8       2     4     f  -11.280   6.9070   2.6390   0.7354   0.4597",
        "EU      63     9       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "EU      63     9       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "EU      63     9       1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "EU      63     9       1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "GD      64     10      1     6     s   -5.440   1.3690   0.0000   1.0000   0.0000",
        "GD      64     10      1     6     p   -5.440   0.0000   0.0000   1.0000   0.0000",
        "GD      64     10      2     5     d   -6.060   2.7470   1.2670   0.7184   0.4447",
        "GD      64     10      2     4     f  -11.280   6.9070   2.6390   0.7354   0.4597",
        "TB      65     11      1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "TB      65     11      1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "TB      65     11      1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "TB      65     11      1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "DY      66     12      1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "DY      66     12      1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "DY      66     12      1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "DY      66     12      1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "HO      67     13      1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "HO      67     13      1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "HO      67     13      1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "HO      67     13      1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ER      68     14      1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ER      68     14      1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ER      68     14      1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ER      68     14      1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "TM      69     15      1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "TM      69     15      1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "TM      69     15      1     5     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "TM      69     15      1     4     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "YB      70     16      1     6     s   -5.350   1.5400   0.0000   1.0000   0.0000",
        "YB      70     16      1     6     p   -5.350   1.5400   0.0000   1.0000   0.0000",
        "YB      70     16      2     5     d   -5.210   2.8100   1.2160   0.7063   0.4834",
        "YB      70     16      2     4     f  -13.860   8.6290   3.1980   0.7460   0.4564",
        "LU      71     17      1     6     s   -6.050   1.6660   0.0000   1.0000   0.0000",
        "LU      71     17      1     6     p   -6.050   1.6660   0.0000   1.0000   0.0000",
        "LU      71     17      2     5     d   -5.120   2.8130   1.2100   0.7044   0.4880",
        "LU      71     17      2     4     f  -22.400   9.1360   3.6660   0.7330   0.4459",
        "HF      72     4       1     6     s   -4.840   1.5270   0.0000   1.0000   0.0000",
        "HF      72     4       1     6     p   -4.840   0.0000   0.0000   1.0000   0.0000",
        "HF      72     4       1     5     d   -6.560   0.0000   0.0000   1.0000   0.0000",
        "TA      73     5       1     6     s  -10.100   2.2800   0.0000   1.0000   0.0000",
        "TA      73     5       1     6     p   -6.860   2.2410   0.0000   1.0000   0.0000",
        "TA      73     5       2     5     d  -12.100   4.7620   1.9380   0.6815   0.6815",
        "W       74     6       1     6     s   -8.260   2.3410   0.0000   1.0000   0.0000",
        "W       74     6       1     6     p   -5.170   2.3090   0.0000   1.0000   0.0000",
        "W       74     6       2     5     d  -10.370   4.9820   2.0680   0.6940   0.5631",
        "RE      75     7       1     6     s   -9.360   2.3980   0.0000   1.0000   0.0000",
        "RE      75     7       1     6     p   -5.960   2.3720   0.0000   1.0000   0.0000",
        "RE      75     7       2     5     d  -12.660   5.3430   2.2770   0.6662   0.5910",
        "OS      76     8       1     6     s   -8.170   2.4520   0.0000   1.0000   0.0000",
        "OS      76     8       1     6     p   -4.810   2.4290   0.0000   1.0000   0.0000",
        "OS      76     8       2     5     d  -11.840   5.5710   2.4160   0.6372   0.5598",
        "IR      77     9       1     6     s  -11.360   2.5000   0.0000   1.0000   0.0000",
        "IR      77     9       1     6     p   -4.500   2.2000   0.0000   1.0000   0.0000",
        "IR      77     9       2     5     d  -12.170   5.7960   2.5570   0.6698   0.5860",
        "PT      78     10      1     6     s   -9.077   2.5540   0.0000   1.0000   0.0000",
        "PT      78     10      1     6     p   -5.475   2.5540   0.0000   1.0000   0.0000",
        "PT      78     10      2     5     d  -12.590   6.0130   2.6960   0.6334   0.5513",
        "AU      79     11      1     6     s  -10.920   2.6020   0.0000   1.0000   0.0000",
        "AU      79     11      1     6     p   -5.550   2.5840   0.0000   1.0000   0.0000",
        "AU      79     11      2     5     d  -15.070   6.1630   2.7940   0.6851   0.5696",
        "HG      80     12      1     6     s  -13.680   2.6490   0.0000   1.0000   0.0000",
        "HG      80     12      1     6     p   -8.470   2.6310   0.0000   1.0000   0.0000",
        "HG      80     12      2     5     d  -17.500   6.4360   3.0320   0.6438   0.5215",
        "TL      81     3       1     6     s  -11.600   2.3000   0.0000   1.0000   0.0000",
        "TL      81     3       1     6     p   -5.800   1.6000   0.0000   1.0000   0.0000",
        "PB      82     4       1     6     s  -15.700   2.3500   0.0000   1.0000   0.0000",
        "PB      82     4       1     6     p   -8.000   2.0600   0.0000   1.0000   0.0000",
        "BI      83     5       1     6     s  -15.190   2.5600   0.0000   1.0000   0.0000",
        "BI      83     5       1     6     p   -7.790   2.0720   0.0000   1.0000   0.0000",
        "PO      84     6       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PO      84     6       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AT      85     7       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AT      85     7       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "RN      86     8       1     6     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "RN      86     8       1     6     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "FR      87     1       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "FR      87     1       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "RA      88     2       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "RA      88     2       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AC      89     3       1     7     s   -5.190   0.0000   0.0000   1.0000   0.0000",
        "AC      89     3       1     7     p   -5.190   0.0000   0.0000   1.0000   0.0000",
        "AC      89     3       1     6     d   -4.790   0.0000   0.0000   1.0000   0.0000",
        "TH      90     0       2     5     f   -9.640   4.4770   1.8370   0.7682   0.4267",
        "TH      90     0       1     7     s   -5.390   1.8340   0.0000   1.0000   0.0000",
        "TH      90     0       1     7     p   -5.390   1.8340   0.0000   1.0000   0.0000",
        "TH      90      0      2     6     d  -10.110   2.4610   1.1650   0.7612   0.4071",
        "TH      90      0      2     5     f   -9.640   4.4770   1.8370   0.7682   0.4267",
        "PA      91     0       1     7     s   -5.410   0.0000   0.0000   1.0000   0.0000",
        "PA      91     0       1     7     p   -5.410   0.0000   0.0000   1.0000   0.0000",
        "PA      91     0       1     6     d   -5.080   0.0000   0.0000   1.0000   0.0000",
        "PA      91      0      1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "U       92      0      1     7     s   -5.500   1.9140   0.0000   1.0000   0.0000",
        "U       92      0      1     7     p   -5.500   1.9140   0.0000   1.0000   0.0000",
        "U       92      0      2     6     d   -9.190   2.5810   1.2070   0.7608   0.4126",
        "U       92      0      2     5     f  -10.620   4.9430   2.1060   0.7844   0.3908",
        "NP      93     0       1     7     s   -5.600   0.0000   0.0000   1.0000   0.0000",
        "NP      93     0       1     7     p   -5.600   0.0000   0.0000   1.0000   0.0000",
        "NP      93     0       1     6     d   -5.110   0.0000   0.0000   1.0000   0.0000",
        "NP      93     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PU      94     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PU      94      0      1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PU      94     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "PU      94     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AM      95     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AM      95     0       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AM      95     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "AM      95     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CM      96     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CM      96     0       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CM      96     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CM      96     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "BK      97     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "BK      97     0       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "BK      97     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "BK      97     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CF      98     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CF      98     0       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CF      98     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "CF      98     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ES      99     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ES      99     0       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ES      99     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "ES      99     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "FM     100     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "FM     100     0       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "FM     100     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "FM     100     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "MD     101     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "MD     101     0       1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "MD     101     0       1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "MD     101     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "NO     102     0       1     7     s   -0.000   0.0000   0.0000   1.0000   0.0000",
        "NO     102      0      1     7     p   -0.000   0.0000   0.0000   1.0000   0.0000",
        "NO     102             1     6     d   -0.000   0.0000   0.0000   1.0000   0.0000",
        "NO     102     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "LR     103     0       1     7     s   -6.740   0.0000   0.0000   1.0000   0.0000",
        "LR     103     0       1     7     p   -6.740   0.0000   0.0000   1.0000   0.0000",
        "LR     103     0       1     6     d   -4.110   0.0000   0.0000   1.0000   0.0000",
        "LR     103     0       1     5     f   -0.000   0.0000   0.0000   1.0000   0.0000",
        "UNQ    104     0       1     7     s   -6.750   0.0000   0.0000   1.0000   0.0000",
        "UNQ    104      0      1     7     p   -6.750   0.0000   0.0000   1.0000   0.0000",
        "UNQ    104      0      1     6     d   -4.110   0.0000   0.0000   1.0000   0.0000",
        "UNQ    104      0      2     5     f  -10.620   4.9430   2.1060   0.7844   0.3908"
    ]






var atomRadius = [['H',0.25],
['He',0.31],
['Li',1.45],
['Be',1.05],
['B',0.85],
['C',0.7],
['N',0.65],
['O',0.6],
['F',0.5],
['Ne',0.38],
['Na',1.8],
['Mg',1.5],
['Al',1.25],
['Si',1.1],
['P',1],
['S',1],
['Cl',1],
['Ar',0.71],
['K',2.2],
['Ca',1.8],
['Sc',1.6],
['Ti',1.4],
['V',1.35],
['Cr',1.4],
['Mn',1.4],
['Fe',1.4],
['Co',1.35],
['Ni',1.35],
['Cu',1.35],
['Zn',1.35],
['Ga',1.3],
['Ge',1.25],
['As',1.15],
['Se',1.15],
['Br',1.15],
['Kr',0.88],
['Rb',2.35],
['Sr',2],
['Y',1.85],
['Zr',1.55],
['Nb',1.45],
['Mo',1.45],
['Tc',1.35],
['Ru',1.3],
['Rh',1.35],
['Pd',1.4],
['Ag',1.6],
['Cd',1.55],
['In',1.55],
['Sn',1.45],
['Sb',1.45],
['Te',1.4],
['I',1.4],
['Xe',1.08],
['Cs',2.6],
['Ba',2.15],
['La',1.95],
['Ce',1.85],
['Pr',1.85],
['Nd',1.85],
['Pm',1.85],
['Sm',1.85],
['Eu',1.85],
['Gd',1.8],
['Tb',1.75],
['Dy',1.75],
['Ho',1.75],
['Er',1.75],
['Tm',1.75],
['Yb',1.75],
['Lu',1.75],
['Hf',1.55],
['Ta',1.45],
['W',1.35],
['Re',1.35],
['Os',1.3],
['Ir',1.35],
['Pt',1.35],
['Au',1.35],
['Hg',1.5],
['Tl',1.9],
['Pb',1.8],
['Bi',1.6],
['Po',1.9],
['At',1.27],
['Rn',1.2],
['Fr',2.15],
['Ra',2.15],
['Ac',1.95],
['Th',1.8],
['Pa',1.8],
['U',1.75],
['Np',1.75],
['Pu',1.75],
['Am',1.75],
['Cm',1.75]
];

var eStructure= [
        ["H",["1s1"]],
        ["He",["1s2"]],
        ["Li",["1s2","2s1"]],
        ["Be",["1s2","2s2"]],
        ["B",["1s2","2s2","2p1"]],
        ["C",["1s2","2s2","2p2"]],
        ["N",["1s2","2s2","2p3"]],
        ["O",["1s2","2s2","2p4"]],
        ["F",["1s2","2s2","2p5"]],
        ["Ne",["1s2","2s2","2p6"]],
        ["Na",["1s2","2s2","2p6","3s1"]],
        ["Mg",["1s2","2s2","2p6","3s2"]],
        ["Al",["1s2","2s2","2p6","3s2","3p1"]],
        ["Si",["1s2","2s2","2p6","3s2","3p2"]],
        ["P",["1s2","2s2","2p6","3s2","3p3"]],
        ["S",["1s2","2s2","2p6","3s2","3p4"]],
        ["Cl",["1s2","2s2","2p6","3s2","3p5"]],
        ["Ar",["1s2","2s2","2p6","3s2","3p6"]],
        ["K",["1s2","2s2","2p6","3s2","3p6","4s1"]],
        ["Ca",["1s2","2s2","2p6","3s2","3p6","4s2"]],
        ["Sc",["1s2","2s2","2p6","3s2","3p6","3d1","4s2"]],
        ["Ti",["1s2","2s2","2p6","3s2","3p6","3d2","4s2"]],
        ["V",["1s2","2s2","2p6","3s2","3p6","3d3","4s2"]],
        ["Cr",["1s2","2s2","2p6","3s2","3p6","3d4","4s2"]],
        ["Mn",["1s2","2s2","2p6","3s2","3p6","3d5","4s2"]],
        ["Fe",["1s2","2s2","2p6","3s2","3p6","3d6","4s2"]],
        ["Co",["1s2","2s2","2p6","3s2","3p6","3d6","4s2"]]
    ];