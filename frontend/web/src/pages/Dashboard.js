



export const Dashboard = () => {
    return(
        <div className="mx-5 row">
                <div className="col-md-3">
                    <div className="bg-white rounded-4 left-bar">
                        <ul className="side-nav-container d-flex p-3 gap-4 flex-column">
                            <li className="btn w-100 mt-5 bg-btn-active fw-bold">Overview</li>
                            <li className="btn w-100 text-gray fw-bold">Create Project</li>
                            <li className="btn w-100 text-gray fw-bold">Logs</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="bg-white p-3 rounded-4 right-bar">
                    <table class="table table-striped table-responsive">
                            <thead>
                                <tr className="text-center">
                                <th scope="col">Duration</th>
                                <th scope="col">Project Name</th>
                                <th scope="col">Smart Contract</th>
                                <th scope="col">No. of Minted Address</th>
                                <th scope="col">No. of Airdrop</th>
                                <th scope="col">More Details</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cost (sol)</th>
                                <th scope="col">Result (sol)</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                <tr>
                                <th scope="row">48:27</th>
                                <td>Okay bear</td>
                                <td>7FYF....yJ35</td>
                                <td>2000</td>
                                <td>1359</td>
                                <td>More detail</td>
                                <td>Active</td>
                                <td>1.3</td>
                                <td>2.3</td>
                                </tr>
                            </tbody>
                            </table>

                        </div>

                </div>
        </div>
        
    )
}