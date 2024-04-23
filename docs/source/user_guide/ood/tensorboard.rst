TensorBoard
=============

Launch TensorBoard, TensorFlow's visualization toolkit, from the Open OnDemand dashboard.

How to Start an OOD TensorBoard Session
------------------------------------------

#. Navigate to the `Open OnDemand dashboard <https://openondemand.delta.ncsa.illinois.edu/>`_.
#. Log in through CILogon with your **NCSA** username, password, and Duo MFA.
#. Open the **Interactive Apps** menu at the top of the window and click **TensorBoard**.
#. Fill out the form and then click **Launch**.

   - **Tensorboard logdir** - The Delta directory that contains data to visualize.
   - **Name of account** - This must match one of your available Delta accounts (CPU or GPU, as appropriate); these are listed under ``Project`` when you run the ``accounts`` command on Delta.
   - **Partition** - Match your partition type to the type of account you entered. (If your account ends in "cpu", then your partition should start with "cpu". If your account ends in "gpu", then your partition should start with "gpu".)
   - **Duration of job** - Select your duration following the format example in the form. Note the duration limit for interactive partitions.
   - **Name of reservation** - Leave empty if none.
   - **Number of CPUs** - Select the number of CPUs you want for the session.
   - **Amount of RAM** - Select your RAM following the format example in the form. Note the default RAM assigned if left blank.
   - **Number of GPUs** - Select the number of GPUs you want for the session. Note, you must select a GPU account and partition to use GPUs.

   \

#. After you click **Launch**, you will be taken to **My Interactive Sessions** where you can view the status of your session.

   .. figure:: ../images/ood/tensorboard-starting.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Code Server session status: "Your session is currently starting...Please be patient as this process can take a few minutes."
      :width: 500

#. Once your session has started, click **Connect to TensorBoard** to launch your TensorBoard environment. Note, this may take a few minutes.

   .. figure:: ../images/ood/tensorboard-connect.png
      :alt: Open OnDemand My Interactive Sessions screen showing the TensorBoard session with the Connect to TensorBoard button.
      :width: 500

#. You are now in your TensorBoard environment on Delta. You can view the time remaining on your interactive sessions by clicking  **My Interactive Sessions** in the Open OnDemand dashboard.

   .. figure:: ../images/ood/ood-interactive-sessions-button.png
      :alt: Open OnDemand options at top of window with the My Interactive Sessions button highlighted.
      :width: 750

|
