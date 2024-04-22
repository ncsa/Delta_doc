.. _ood-code-server:

Code Server (VS Code)
========================

The Open OnDemand dashboard provides an easy way to launch a VS Code environment in a web browser.

How to Start an OOD VS Code Session
--------------------------------------

#. Navigate to the `Open OnDemand dashboard <https://openondemand.delta.ncsa.illinois.edu/>`_.
#. Log in through CILogon with your **NCSA** username, password, and Duo MFA.
#. Open the **Interactive Apps** menu at the top of the window and click **Code Server**.
#. Fill out the form and then click **Launch**.

   - **Name of account** - This must match one of your available Delta accounts (CPU or GPU, as appropriate); these are listed under **Project** when you run the ``accounts`` command on Delta.
   - **Partition** - Match your partition type to the type of account you entered. (If your account ends in "cpu", then your partition should start with "cpu". If your account ends in "gpu", then your partition should start with "gpu".)
   - **Duration of job** - Select your duration following the format example in the form. Note the duration limit for interactive partitions.
   - **Name of reservation** - Leave empty if none.
   - **Number of CPUs** - Select the number of CPUs you want for the session.
   - **Amount of RAM** - Select your RAM following the format example in the form. Note the default RAM assigned if left blank.
   - **Number of GPUs** - Select the number of GPUs you want for the session. Note, you must select a GPU account and partition to use GPUs.
   - **Working Directory** - Note the default if this is left blank.

   \

#. After you click **Launch**, you will be taken to **My Interactive Sessions** where you can view the status of your session.

   .. figure:: ../images/ood/code-server-starting.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Code Server session status: "Your session is currently starting...Please be patient as this process can take a few minutes."
      :width: 500

#. Once your session has started, click **Connect to VS Code** to launch your Jupyter Lab environment. Note, this may take a few minutes.

   .. figure:: ../images/ood/vs-code-connect.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Jupyter Lab session with the Connect to VS Code button.
      :width: 500

#. You are now in your VS Code environment on Delta. You can view the time remaining on your interactive sessions by clicking **Interactive Sessions** in the Open OnDemand dashboard.

   .. figure:: ../images/ood/ood-interactive-sessions-button.png
      :alt: Open OnDemand options at top of window with the Interactive Sessions button highlighted.
      :width: 750

|
