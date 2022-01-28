import React, { Component } from 'react';
import utils from './utils';
export class StarsDisplay extends Component {
    render() {
        return (   
            <>
               {utils.range(1, this.props.count).map(starId =>
                    <div key={starId} className='star' />
                )}
            </>
            );
    }
}
export default StarsDisplay;
