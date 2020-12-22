import React from "react"
import soda from "soda-js"

export default class Closest extends React.Component {

        state = {
                    error: null,
                    isLoaded: false,
                    parks: []
                  }
        componentDidMount() {
                var consumer = new soda.Consumer('data.sfgov.org', {apiToken: "KaDAqjsP0wawPPnQ6QQQbX9Gv"});

                consumer.query()
                        .withDataset('gtr9-ntp6')
                        .where('within_circle(shape, ' + this.props.lat 
               +', '+ this.props.lng +', 1000)')
                        .limit(5)
                  .getRows()
                        .on('success', (rows) => {
                                this.setState({
                                                  isLoaded: true,
                                                  parks: rows
                                                });
                        })
                        .on('error', (error) => {
                                this.setState({
                                                  isLoaded: true,
                                                  error
                                                });
                                });
        }

        render() {
                const { error, isLoaded, parks } = this.state
                if (error) {
                              return <div>Error: {error.message}</div>;
                            } else if (!isLoaded) {
                                          return <div>Finding parks near {this.props.lat},{this.props.lng}</div>;
                            } else {
                                    return (
                                            <div>
                                                    <p>Your closest parks are:</p>
                                            <ul>
                                                    {parks.map(park => (
                                                            <li>{park.map_label}</li>
                                                    ))}
                                                    </ul>
                                                    <p>Using {this.props.lat}, {this.props.lng} as your location.</p>
                                            </div>
                                    )
                            }
        }
}
