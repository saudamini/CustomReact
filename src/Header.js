import { useEffect, useState } from "react";

const Header = () => {
    const [btnText, setBtntext] = useState("Login");
    const [listofRest, setListofRest] = useState();
    const [filteredRest, setFilteredRest] = useState();
    const [searchTxt, setSearchTxt] = useState("");

    useEffect(() => {
         fetchData();
    }, [] );
    
    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        setListofRest(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRest(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }


   
    return (
        <div className="header">
            <div>Logo</div>
            <button onClick={() => {btnText == "Login" ? setBtntext("Logout"): setBtntext("Login")}}>
                {btnText}
            </button>
            <input type="text" placeholder="Search" value={searchTxt} onChange={(e) => (setSearchTxt(e.target.value))} />
            <button onClick={() => {
                console.log('searchTxt', searchTxt)
                const filteredRestaurant = listofRest.filter( (rest) => { return rest?.info?.name.toLowerCase()?.includes(searchTxt.toLowerCase())});
                setFilteredRest(filteredRestaurant);
            }
            }>Search</button>

            {
               filteredRest && filteredRest.map(rest => (
                    <div key={rest?.info?.id}>
                        {rest?.info?.name}
                    </div>
                )

                )
            }
        </div>
    )
}

export default Header;