import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as _ from 'lodash';

const swal = typeof window !== 'undefined' ? require('sweetalert') : null

class SweetAlert extends React.Component<any, any> {

    private displayName = 'SweetAlert';
    private defaultProps = {
        type: 'warning',
        text: 'Are you sure you want to do this?',
        title: 'Are you sure?',
        allowEscKey: true,
        customClass: null,
        allowOutSideClick: false,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Confirm',
        confirmButtonColor: '#AEDEF4',
        cancelButtonText: 'Cancel',
        closeOnConfirm: true,
        closeOnCancel: true,
        imageUrl: null,
        imageSize: '80x80',
        timer: null,
        html: false,
        animation: true,
        inputType: 'text',
        inputPlaceholder: null,
        inputValue: null
    };

    render () {
        let isOpen = this.props.isOpen

        if (isOpen && _.isFunction(swal)) {
            let options = _.pick(this.props, Object.keys(this.defaultProps))
            swal(options, (result) => {
                if (this.props.callback) {
                    this.props.callback(result)
                }
            });
            console.log("swal options:" + JSON.stringify(options, null, '   '));
            //swal("here is a message");
        }
        return null;
    }
}

export default SweetAlert
