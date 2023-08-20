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
                <p class="step-desc">Database Configuration</p>
            </div>
            <div class="step">
                <p class="step-num">Step 2</p>
                <div class="bullet">
                    <span></span>
                </div>
                <i class="fa-solid fa-check check-icon"></i>
                <p class="step-desc">Create Database</p>
            </div>
            <div class="step">
                <p class="step-num">Step 3</p>
                <div class="bullet">
                    <span></span>
                </div>
                <i class="fa-solid fa-check check-icon"></i>
                <p class="step-desc">Create Admin User</p>
            </div>
            <div class="step">
                <p class="step-num">Step 4</p>
                <div class="bullet">
                    <span></span>
                </div>
                <i class="fa-solid fa-check check-icon"></i>
                <p class="step-desc">Email Configuration</p>
            </div>
            <div class="step">
                <p class="step-num">Step 5</p>
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
                        <div class="title">Database Configuration</div>
                        <hr>
                        <form action="" method="post" id="dbConfigForm">
                            <div class="row mt-4">
                                <div class="col-md-6">
                                    <div class="field">
                                        <label for="baseUrl">URL</label>
                                        <input type="text" id="baseUrl" name="baseUrl" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="field">
                                        <label for="dbUser">DB User</label>
                                        <input type="text" id="dbUser" name="dbUser" required>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="field">
                                        <label for="dbHost">Server Host</label>
                                        <input type="text" id="dbHost" name="dbHost" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="field">
                                        <label for="dbPass">DB Pass</label>
                                        <input type="password" id="dbPass" name="dbPass" required>
                                    </div>
                                </div>
                            </div>
                            <div class="field nextBtn">
                                <button type="submit" id="firstNextBtn">Continue</button>
                            </div>
                        </form>
                    </div>

                    <div class="page">
                        <div class="title">Create Database</div>
                        <hr>
                        <form action="" method="post" id="dbTableSetupForm">
                            <div class="field" style="left: 200px; top: 50px;">
                                <label for="dbName">Database Name</label>
                                <input type="text" id="dbName" name="dbName" required>
                            </div>
                            <br><br>
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
                            <div class="field btns">
                                <button class="prev-1 prev">Back</button>
                                <button type="submit" class="next-1 next">Continue</button>
                            </div>
                        </form>
                    </div>

                    <div class="page">
                        <div class="title">Create Admin User</div>
                        <hr>
                        <form action="" method="post" id="adminSetupForm">
                            <div class="row mt-5">
                                <div class="col-md-5">
                                    <div class="field">
                                        <label for="uName">Username</label>
                                        <input type="text" id="uName" name="uName" required>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="field">
                                        <label for="uEmail">Admin Email</label>
                                        <input type="email" id="uEmail" name="uEmail" required>
                                    </div>
                                </div>
                                <div class="field">
                                    <div class="center-input">
                                        <label for="uPass">Admin Password</label>
                                        <input type="password" id="uPass" name="uPass" required>
                                    </div>
                                </div>
                            </div>
                            <div class="field btns">
                                <button class="prev-2 prev">Back</button>
                                <button type="submit" class="next-2 next">Continue</button>
                            </div>
                        </form>
                    </div>

                    <div class="page">
                        <div class="title">Email Configuration</div>
                        <hr>
                        <form action="" method="post" id="emailConfigForm">
                            <div class="page-body">
                                <div class="row" style="margin-left: 3px;">
                                    <div class="col-md-5">
                                        <div class="field">
                                            <label for="companyName">Company Name</label>
                                            <input type="text" id="companyName" name="companyName" required>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="field">
                                            <label for="hostEmail">Host Email</label>
                                            <input type="text" id="hostEmail" name="hostEmail" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row" style="height: 190px; margin-left: 3px;">
                                    <div class="col-md-5">
                                        <div class="field">
                                            <label for="hostUser">Host Username</label>
                                            <input type="email" id="hostUser" name="hostUser" required>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="field">
                                            <label for="hostPass">Host Password</label>
                                            <input type="password" id="hostPass" name="hostPass" required>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="center-input">
                                            <label for="hostPort">Host Port</label>
                                            <input type="number" id="hostPort" name="hostPort" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="horizontal-line"></div>
                                <div class="row" style="margin-left: 3px;">
                                    <div class="col-md-5">
                                        <div class="field">
                                            <label for="supportEmail">Support Email</label>
                                            <input type="email" id="supportEmail" name="supportEmail" required>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <div class="field">
                                            <label for="supportNumber">Support Number</label>
                                            <input type="number" id="supportNumber" name="supportNumber" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="field btns">
                                <button class="prev-3 prev">Back</button>
                                <button type="submit" class="next-3 next">Continue</button>
                            </div>
                        </form>
                    </div>

                    <div class="page">
                        <div class="title">Final Step</div>
                        <hr>
                        <div class="field final-text">
                            <h2 id="h2Text">You're all set!</h2>
                            <p class="reminder-text" style="margin-top: 50px;">Proceed into the web-app below</p>
                            <p class="reminder-text">OR</p>
                            <p class="reminder-text">Go back if you need to fix any input...</p>
                        </div>
                        <hr>
                        <div class="field btns">
                            <button class="prev-4 prev">Back</button>
                            <button class="login">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>