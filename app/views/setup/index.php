<div class="step-container">
        <header>Pre-launch Setup</header>
        <hr>
        <div class="step-progress">
            <div class="step">
                <p class="step-num">Step 1</p>
                <div class="bullet">
                    <span></span>
                </div>
                <i class="fa-solid fa-check check-icon"></i>
                <p class="step-desc">Create Database</p>
            </div>
            <div class="step">
                <p class="step-num">Step 2</p>
                <div class="bullet">
                    <span></span>
                </div>
                <i class="fa-solid fa-check check-icon"></i>
                <p class="step-desc">Create Admin User</p>
            </div>
            <div class="step">
                <p class="step-num">Step 3</p>
                <div class="bullet">
                    <span></span>
                </div>
                <i class="fa-solid fa-check check-icon"></i>
                <p class="step-desc">Email Configuration</p>
            </div>
            <div class="step">
                <p class="step-num">Step 4</p>
                <div class="bullet">
                    <span></span>
                </div>
                <i class="fa-solid fa-check check-icon"></i>
                <p class="step-desc">Finished</p>
            </div>
        </div>
        <div class="form-outer">
            <div class="page-holder">
                <div class="form-container">
                    <div class="page slidePage">
                        <div class="title">Create Database</div>
                        <hr>
                        <form action="" method="post" id="dbTableSetupForm">
                            <div class="row">
                                <div class="field input-group-1">
                                    <label for="dbName">Database Name</label>
                                    <input type="text" id="dbName" name="dbName" required>
                                </div>
                            </div>
                            <br>
                            <div class="field">
                                <div id="loading-bar">
                                    <div class="wavy">
                                        <span style="--i:1">S</span>
                                        <span style="--i:2">e</span>
                                        <span style="--i:3">t</span>
                                        <span style="--i:4">t</span>
                                        <span style="--i:5">i</span>
                                        <span style="--i:6">n</span>
                                        <span style="--i:7">g</span>
                                        <span style="--i:8"></span>
                                        <span style="--i:9">y</span>
                                        <span style="--i:10">o</span>
                                        <span style="--i:11">u</span>
                                        <span style="--i:12">r</span>
                                        <span style="--i:13"></span>
                                        <span style="--i:14">t</span>
                                        <span style="--i:15">a</span>
                                        <span style="--i:16">b</span>
                                        <span style="--i:17">l</span>
                                        <span style="--i:18">e</span>
                                        <span style="--i:19">s</span>
                                        <span style="--i:20"></span>
                                        <span style="--i:21">u</span>
                                        <span style="--i:22">p</span>
                                        <span style="--i:23">.</span>
                                        <span style="--i:24">.</span>
                                        <span style="--i:25">.</span>
                                    </div>
                                    <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                        <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <button type="submit" class="next-1 next">Continue</button>
                        </form>
                    </div>

                    <div class="page">
                        <div class="title">Create Admin User</div>
                        <hr>
                        <form action="" method="post" id="adminSetupForm">
                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <div class="field" style="left: 100px;">
                                        <label for="uName">Username</label>
                                        <input type="text" id="uName" name="uName" required>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="field" style="left: 50px;">
                                        <label for="uEmail">Admin Email</label>
                                        <input type="email" id="uEmail" name="uEmail" required>
                                    </div>
                                </div>
                                <div class="field" style="top: 40px;left: 260px;">
                                    <label for="uPass">Admin Password</label>
                                    <input type="password" id="uPass" name="uPass" required>
                                </div>
                            </div>
                            <button type="submit" class="next-2 next">Continue</button>
                        </form>
                    </div>

                    <div class="page">
                        <div class="title">Email Configuration</div>
                        <hr>
                        <form action="" method="post" id="emailConfigForm">
                            <div class="row mt-4 mb-2">
                                <div class="col-md-5">
                                    <div class="field input-group-3">
                                        <label for="hostEmail">Host Email</label>
                                        <input type="text" id="hostEmail" name="hostEmail" required>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="field input-group-3">
                                        <label for="port">Host Port</label>
                                        <input type="number" id="port" name="port" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-5">
                                    <div class="field input-group-3">
                                        <label for="hostUser">Host Username</label>
                                        <input type="email" id="hostUser" name="hostUser" required>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="field input-group-3">
                                        <label for="hostPass">Host Password</label>
                                        <input type="password" id="hostPass" name="hostPass" required>
                                    </div>
                                </div>
                            </div>
                            <div class="horizontal-line"></div>
                            <div class="row mt-4">
                                <div class="col-md-5">
                                    <div class="field input-group-3">
                                        <label for="companyName">Company Name</label>
                                        <input type="text" id="companyName" name="companyName" required>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="field input-group-3">
                                        <label for="supportEmail">Support Email</label>
                                        <input type="email" id="supportEmail" name="supportEmail" required>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="next-3 next">Continue</button>
                        </form>
                    </div>

                    <div class="page">
                        <div class="title">Final Step</div>
                        <hr>
                        <h2 id="h2Text" class="ms-5">You're all set!</h2>
                        <hr>
                        <button class="login">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>