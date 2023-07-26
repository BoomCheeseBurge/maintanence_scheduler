        <div class="container mt-3">
            <div class="row">
                <div class="col-lg-6">
                    <?php Flasher::flash(); ?>
                </div>
            </div>

            <h3 class="ms-3">New Maintenance Schedule</h3>

            <br>

            <div class="form-outline mb-4">
                <div class="wrapper">
                    <div class="form-box">
                        <form action="<?= BASEURL; ?>/maintenance/addSchedule" method="post">
                            <div class="divider-container">
                                <div class="divider">
                                    <!-- Nomor SOP input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-building"></i>
                                        </span>
                                        <input type="search" name="noSOP" id="noSOP" required>
                                        <div id="noSOPList"></div>
                                        <label for="noSOP">Nomor SOP</label>
                                    </div>

                                    <!-- Company Name input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-building"></i>
                                        </span>
                                        <input type="search" name="companyName" id="companyName" required>
                                        <div id="companyNameList"></div>
                                        <label for="companyName">Company Name</label>
                                    </div>

                                    <!-- Device Tag input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-tags"></i>
                                        </span>
                                        <input type="search" name="deviceTag" id="deviceTag" required readonly>
                                        <div id="deviceTagList"></div>
                                        <label for="deviceTag">Device Tag</label>
                                    </div>
                                </div>

                                <div class="divider-bar"></div>

                                <div class="divider">

                                    <!-- Assigned Engineer input -->
                                    <div class="input-box">
                                        <span class="icon">
                                        <i class="fa-solid fa-user"></i>
                                        </span>
                                        <input type="search" name="assignee" id="assignee" required readonly>
                                        <div id="assigneeList"></div>
                                        <label for="assignee">Assigned Engineer</label>
                                    </div>

                                    <!-- PM Period Count -->
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="pmPeriodCount">PM Period count :</span>
                                        <input type="text" class="form-control" aria-label="pmPeriodCount" aria-describedby="pmPeriodCount" required readonly>
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