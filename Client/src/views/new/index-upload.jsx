import React, { Component } from 'react';

export default class FilesUploadComponent extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //       form: null
    //     };

    //     this.addFile = this.addFile.bind(this)
    //   }

    //   addFile = (file) => {
    //     // event to update state when form inputs change
    //     const fd = new FormData();
    //     fd.append('avatar', file);

    //     console.log(fd)

    //     this.setState({ form: fd });
    //   }

      

    //   onSubmit = (e) => {
    //     e.preventDefault();
    //     // event to submit the data to the server
    //   }


    render() {

        // const { form } = this.state;
        // const input = document.getElementById('avatar');

// add event listener
// input.addEventListener('change', () => {
//     this.addFile(input.file);
// });

        return (
            <div className="container">
                <div className="row">
                    <form>
                        <div className="form-group">
                            <input type="file" name="cover" id="cover" onChange={e => this.props.addFile(e)}/>
                        </div>
                        {/* <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div> */}
                    </form>
                </div>
            </div>
        )
    }
}