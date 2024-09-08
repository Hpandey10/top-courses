import React, { useEffect , useState} from "react";
import { apiUrl ,filterData } from "./data"
import Navbar from "./components/Navbar.js";
import Filter from "./components/Filter.js";
import Cards from  "./components/Cards.js";
import Spinner from "./components/Spinner.js";
import { toast } from "react-toastify"
const App = () => {


  const  [courses, setCourses]  = useState(null);
  const [loading, setloading]  = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

    async function fetchData() {
      setloading(true);
      try{
        const response = await fetch(apiUrl);
        const output = await response.json();

        setCourses(output.data);
      }
      catch(error){
        toast.error("Something went wrong");
      }
      setloading(false);
    }
   
    useEffect(()  =>{
      fetchData();
    }, [])


 return(
<div className="min-h-screen flex flex-col bg-bgDark2 ">
<div>
<Navbar/>
</div>
<div className="bg-bgDark2">
<div>
<Filter   
    filterData={filterData}
    category={category}
    setCategory={setCategory}
  />
</div>
<div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
  {
    loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
  }
</div>
</div>
  
</div>
 );
};

export default App;
