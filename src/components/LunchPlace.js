import React from 'react'; 
import '../styles/LunchPlace.css';
import toastr from 'toastr';
import * as constants from '../Constants';


class LunchPlace extends React.Component {
    constructor(props){
          super(props);  
          this.onChangeOfSearchBox = this.onChangeOfSearchBox.bind(this);
          this.onClickOfSearch = this.onClickOfSearch.bind(this);
          this.state= {
            searchBoxValue :"",
            participantBoxvalue:"",
            venueDetails: [],
            participants :  [] 
            }
 
        }
    onChangeOfSearchBox(e){
        this.setState({searchBoxValue : e.target.value});
    }
    onClickOfSearch(e){
        if(this.state.searchBoxValue){

            const url = 'https://api.foursquare.com/v2/venues/explore?'+
                        'client_id='+constants.CLIENTID+
                        '&client_secret='+constants.CLIENTSECRET+
                        '&query=lunch &near='+this.state.searchBoxValue+' &v=20170801 &limit=3'; 
            console.log(url);
            this.setState({searchBoxValue : ''});
            let that = this;
            fetch(url)
            .then(function(response) {
                // Code for handling API response
                return response.json();
            })
            .then(function(myJson){
                //console.log(myJson);
                if(myJson["meta"].code === 200){
                    let found_options =  myJson.response.groups[0].items;
                    // console.log(found_options);
                    let massagedObject = found_options.map((ob)=>{ return { 'name' : ob.venue.name , 
                                                        'v_id' : ob.venue.id,
                                                    'title' : ob.venue.categories[0].shortName, 
                                                    'src':ob.venue.categories[0].icon.prefix + ob.venue.categories[0].icon.suffix,
                                                    'numberOfTimeClicked' : 0
                                                    }
                                    });
                    console.log(massagedObject);                
                    that.setState({venueDetails : massagedObject} );
                    }
                    else{
                        toastr.warning("Please enter the correct venue");
                    }
            })
            .catch(function(error) {
                toastr.error(error);
            });

        }
         else
             toastr.warning("Please enter before searching");

        
    }
    render(){
              return(
                <div className="lp-page-container">
                    <div className="lp-search-container"> 
                    <input 
                        className="lp-text-box" 
                        placeholder="type your city or geocode.. "  
                        type="text"
                        value ={this.state.searchBoxValue}
                        onChange = {this.onChangeOfSearchBox}
                    />                     
                    <input  
                        type="button" 
                        value="Search"
                        className="lp-search-button"
                        onClick = {this.onClickOfSearch}
                    />
                    </div>
                 </div>
              )
          }
};


export default LunchPlace;