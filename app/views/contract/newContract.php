<div class="container mt-3">
            <div class="row">
                <div class="col-lg-6">
                    <?php Flasher::flash(); ?>
                </div>
            </div>

            <h3 class="ms-3">New Contract</h3>

            <br>

            <div class="form-outline mb-4">
                <div class="wrapper">
                    <div class="form-box">
                        <form action="<?= BASEURL; ?>/contract/addContract" method="post">
                            <div class="divider-container">
                                <div class="divider">
                                    <!-- Company Name input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-building"></i>
                                        </span>
                                        <input type="search" name="companyName" id="companyName" required>
                                        <div id="companyNameList"></div>
                                        <label for="companyName">Company Name</label>
                                    </div>

                                    <!-- Nomor SOP input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-hashtag"></i>
                                        </span>
                                        <input type="text" name="noSOP" id="noSOP" required>
                                        <label for="noSOP">Nomor SOP</label>
                                    </div>
                                    
                                    <!-- Device Tag input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-tags"></i>
                                        </span>
                                        <input type="text" name="deviceTag" id="deviceTag" required>
                                        <label for="deviceTag">Device</label>
                                    </div>
                                </div>

                                <div class="divider-bar"></div>

                                <div class="divider">
                                    <!-- Assigned Engineer input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-user"></i>
                                        </span>
                                        <input type="search" name="assignee" id="assignee" required>
                                        <div id="assigneeList"></div>
                                        <label for="assignee">Assigned Engineer</label>
                                    </div>

                                    <!-- Contract Period input -->
                                    <div class="form-outline mb-4 input-box">
                                        <span class="icon">
                                            <i class="fa-solid fa-file-contract"></i>
                                        </span>
                                        <input type="text" id="daterange" name="daterange" value="" required/>
                                        <label class="form-label" for="daterange">Contract Period</label><br>
                                    </div>

                                    <!-- PM Period input -->
                                    <div class="input-group mb-3">
                                        <label class="input-group-text" for="pmPeriod">PM Periode :</label>
                                        <select class="form-select" id="pmPeriod" required>
                                            <option selected disabled>Choose here</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </div>


                                </div>
                            </div>

                            <hr>
                            <div class="submit-button">
                                <!-- Submit button -->
                                <button type="submit" class="btn btn-custom btn-block mb-4">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>