<div class="container mt-3">
            <div class="row">
                <div class="col-lg-6">
                    <?php Flasher::flash(); ?>
                </div>
            </div>

            <h3 class="ms-3">New Client</h3>

            <br>

            <div class="form-outline mb-4">
                <div class="wrapper">
                    <div class="form-box">
                        <form action="<?= BASEURL; ?>/client/addClient" method="post">
                            <div class="divider-container">
                                <div class="divider">
                                    <div class="form-floating mb-3">
                                        <input type="text" class="form-control" id="floatingText" name="clientName" required placeholder="clientName">
                                        <label for="floatingText">Client Name</label>
                                    </div>
                                </div>

                                <div class="divider-bar"></div>

                                <div class="divider">
                                    <h6>PIC Client 1</h6>
                                    <div class="form-floating mb-1">
                                        <input type="text" class="form-control" id="floatingPIC" name="picName[]" required placeholder="picName">
                                        <label for="floatingPIC">PIC Name</label>
                                    </div>
                                    <div class="form-floating mb-4">
                                        <input type="email" class="form-control" id="floatingEmail" name="picEmail[]" required placeholder="picEmail">
                                        <label for="floatingEmail">PIC Email</label>
                                    </div>
                                    <!-- Container for additional PIC fields -->
                                    <div id="picFieldsContainer"></div>
                                    <!-- Plus button to add more PIC fields -->
                                    <button type="button" class="btn btn-primary" id="addPicFieldsBtn">+</button>
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