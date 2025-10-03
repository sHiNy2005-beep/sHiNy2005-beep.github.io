const getShoes =async() => {
    const url ="https://sHiNy2005-beep.github.io/json/shoes.json";
    try{
        const response = await fetch(url);
        return response.json();
    }
    catch(Error){
        console.log("sorry");
    }
};

const showShoes =async() => {
    const shoes = await getShoes();
    const shoeListDiv =document.getElementById("shoe-list");

    shoes.forEach((shoe)=>{
        //make a section for each shoe put all the data in, 
        // then apped it to the shoe list 
        const section = document.createElement("h3")
       
        //console.log(shoe.name);


    });


};

showShoes();