import React from 'react'; 
import '../styles/LunchPlace.css';
import toastr from 'toastr';
import * as constants from '../Constants';
import UserVenueGrid from './UserVenueGrid';
import _ from 'lodash';

class LunchPlace extends React.Component {
        constructor(props){
              super(props) ;  
              this.onChangeOfSearchBox = this.onChangeOfSearchBox.bind(this);
              this.onClickOfSearch = this.onClickOfSearch.bind(this);
              this.onChangeOfParticipantBox = this.onChangeOfParticipantBox.bind(this);
              this.onClickOfAddParticipant = this.onClickOfAddParticipant.bind(this);
              this.state= {
                  searchBoxValue :"",
                  participantBoxvalue:"",
                  venueDetails: [],
                  participants :  [] //{ 'name':"mohan", 'p_id': 0 }
              }
        }
        onChangeOfSearchBox(e){
            this.setState({searchBoxValue : e.target.value});
        }
        onChangeOfParticipantBox(e){
            this.setState({participantBoxvalue : e.target.value});
        }
        onClickOfAddParticipant(e){

            if(this.state.participantBoxvalue && this.state.venueDetails.length> 0){
            let obj, newParticpantObject ={};
               obj= _.maxBy(this.state.participants, function(o){return o.p_id})
               if(obj){
                newParticpantObject["p_id"] = obj.p_id +1;
               }
               else{
                newParticpantObject["p_id"] = 0;
               }
               newParticpantObject["name"] = this.state.participantBoxvalue;
               this.setState({
                participants : this.state.participants.concat(newParticpantObject),
                participantBoxvalue : ""
               });
            }
            else{
                if(this.state.venueDetails.length === 0){
                    toastr.warning("Can not add the participant before venue selection");
                }
                else
                    toastr.warning("Please Enter the participant name");
            }

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
                     <div>
                        <UserVenueGrid 
                            venueDetails = {this.state.venueDetails}
                            participants = {this.state.participants}
                        >
                        </UserVenueGrid>
                     </div>
                     <div className="lp-participant-container"> 
                        <input 
                            className="lp-text-box lp-width50" 
                            placeholder="Enter the name"  
                            type="text"
                            value = {this.state.participantBoxvalue}
                            onChange = {this.onChangeOfParticipantBox}
                        />                     
                        <input  
                            type="button" 
                            value="Add Participant"
                            className="lp-search-button"
                            onClick = {this.onClickOfAddParticipant}
                        />
                     </div>

                </div>
            );
        }

};

export default LunchPlace;