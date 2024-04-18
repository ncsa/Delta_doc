.. _openon:

Open OnDemand
================

Open OnDemand (OOD) is the simplest method to log into Delta. Refer to the `Delta login - Open OnDemand <https://docs.ncsa.illinois.edu/systems/delta/en/latest/user_guide/login.html#open-ondemand>`_ section for instructions on how to log into the system via this method.

Interactive Apps
--------------------

Currently supported Interactive Apps are:

  - :ref:`Jupyter Lab <ood-jupyter>`
  - :ref:`Code Server (VS Code) <ood-codeserver>`
  - Tensor Board
  - :ref:`Desktop <ood-desktop>`

.. _ood-jupyter:

Jupyter Lab
-------------------

The Open OnDemand dashboard provides an easy way to launch a Jupyter Lab environment on Delta.

To start an OOD Jupyter Lab session:

  #. Navigate to the `Open OnDemand dashboard <https://openondemand.delta.ncsa.illinois.edu/>`_.
  #. Log in through CILogon with your **NCSA** username, password, and Duo MFA.
  #. Open on the **Interactive Apps** menu at the top of the window and click on **Jupyter Lab**.
  #. Fill out the form form and then click the **Launch** button.

     - **Name of account** - This must match one of your available Delta accounts (CPU or GPU, as appropriate); these are listed under "Project" when you run the ``accounts`` command on Delta.
     - **Partition** - Match your partition type to the type of account you entered. (If your account ends in "cpu", then your partition should start with "cpu". If your account ends in "gpu", then your partition should start with "gpu".)
     - **Duration of job** - Select your duration following the format exmaple in the form. Note the duration limit for interactive partitions.
     - **Name of reservation** - Leave empty if none.
     - **Number of CPUs** - Select the number of CPUs you want for the session.
     - **Amount of RAM** - Select your RAM following the format example in the form. Note the default RAM assigned if left blank.
     - **Number of GPUs** - Select the number of CPUs you want for the session. Note, you must select a GPU account and partition in order to use GPUs.
     - **Working Directory** - Note the default directory if this is left blank.

     \

  #. After you click Launch, you will be taken to the "My Interactive Sessions" screen where you can view the status of your session.

     .. figure:: images/ood/jupyter-starting.png
        :alt: Open OnDemand "My Interactive Sessions" screen showing the Jupyter Lab session status: "Your session is currenlty starting...Please be patient as this process can take a few minutes."
        :width: 500

  #. Once your session has started, click the **Connect to Jupyter** button to launch your Jupyter Lab environment. Note, this may take a few minutes.

     .. figure:: images/ood/jupyter-connect.png
        :alt: Open OnDemand "My Interactive Sessions" screen showing the Jupyter Lab session with the "Connect to Jupyter" button.
        :width: 500

  #. You're now in your Jupyter Lab environment on Delta. You can view the time remaining on your interactive sessions by clicking the Interactive Sessions button from the Open OnDemand dashboard.

     .. figure:: images/ood/ood-interactive-sessions-button.png
        :alt: Open OnDemand options at top of window with the Interactive Sessions button highlighted.
        :width: 750

.. _ood-codeserver:

Code Server (VS Code)
-----------------------------

The Open OnDemand dashboard provides an easy way to launch a VS Code environment in a web browser.

To start an OOD VS Code session:

  #. Navigate to the `Open OnDemand dashboard <https://openondemand.delta.ncsa.illinois.edu/>`_.
  #. Log in through CILogon with your **NCSA** username, password, and Duo MFA.
  #. Open on the **Interactive Apps** menu at the top of the window and click on **Code Server**.
  #. Fill out the form form and then click the **Launch** button.

     - **Name of account** - This must match one of your available Delta accounts (CPU or GPU, as appropriate); these are listed under "Project" when you run the ``accounts`` command on Delta.
     - **Partition** - Match your partition type to the type of account you entered. (If your account ends in "cpu", then your partition should start with "cpu". If your account ends in "gpu", then your partition should start with "gpu".)
     - **Duration of job** - Select your duration following the format exmaple in the form. Note the duration limit for interactive partitions.
     - **Name of reservation** - Leave empty if none.
     - **Number of CPUs** - Select the number of CPUs you want for the session.
     - **Amount of RAM** - Select your RAM following the format example in the form. Note the default RAM assigned if left blank.
     - **Number of GPUs** - Select the number of CPUs you want for the session. Note, you must select a GPU account and partition in order to use GPUs.
     - **Working Directory** - Note the default if this is left blank.

     \

  #. After you click Launch, you will be taken to the "My Interactive Sessions" screen where you can view the status of your session.

     .. figure:: images/ood/code-server-starting.png
        :alt: Open OnDemand "My Interactive Sessions" screen showing the Code Server session status: "Your session is currenlty starting...Please be patient as this process can take a few minutes."
        :width: 500

  #. Once your session has started, click the **Connect to VS Code** button to launch your Jupyter Lab environment. Note, this may take a few minutes.

     .. figure:: images/ood/vs-code-connect.png
        :alt: Open OnDemand "My Interactive Sessions" screen showing the Jupyter Lab session with the "Connect to VS Code" button.
        :width: 500

  #. You're now in your VS Code environment on Delta. You can view the time remaining on your interactive sessions by clicking the Interactive Sessions button from the Open OnDemand dashboard.

     .. figure:: images/ood/ood-interactive-sessions-button.png
        :alt: Open OnDemand options at top of window with the Interactive Sessions button highlighted.
        :width: 750

.. _ood-desktop:

Desktop
----------------

Open OnDemand provides a VNC service (`noVNC <https://novnc.com>`_) through the "Desktop" Interactive App.  
Desktop runs in a job on a compute node and gives you access to a virtual Linux desktop that can provide a better graphics experience than X11. Elements to keep in mind:

- noVNC runs within a container that can see the Delta filesystems (``$HOME``, ``/scratch``, ``/projects``, ``/sw``). Delta modules are available from the container. 
- You can navigate to a directory and manually launch applications that require a GUI.  
- You may need to set ``PATH`` and ``LD_LIBRARY_PATH`` from some applications.  
- Some applications may fail if the libraries required are not available in the container.  
- Due to space and time constraints, it's not possible to build a container that represents all of the software installed in ``/sw``. Consider a *"some assembly required"* approach if you run into issues trying to launch a program.  
- Use ``module show <foo>`` when logged into Delta via SSH or VS Code to discover the PATHs and environment settings you may need to include in the noVNC desktop.

To start an OOD Desktop session:

  #. Navigate to the `Open OnDemand dashboard <https://openondemand.delta.ncsa.illinois.edu/>`_.
  #. Log in through CILogon with your **NCSA** username, password, and Duo MFA.
  #. Open on the **Interactive Apps** menu at the top of the window and click on **Desktop**.
  #. Fill out the form form and then click the **Launch** button.

     - **Container image to use** - Select the container image you want to use from the menu.
     - **Name of account** - This must match one of your available Delta accounts (CPU or GPU, as appropriate); these are listed under "Project" when you run the ``accounts`` command on Delta.
     - **Partition** - Match your partition type to the type of account you entered. (If your account ends in "cpu", then your partition should start with "cpu". If your account ends in "gpu", then your partition should start with "gpu".)
     - **Duration of job** - Select your duration following the format exmaple in the form. Note the duration limit for interactive partitions.
     - **Name of reservation** - Leave empty if none.
     - **Number of CPUs** - Select the number of CPUs you want for the session.
     - **Amount of RAM** - Select your RAM following the format example in the form. Note the default RAM assigned if left blank.
     - **Number of GPUs** - Select the number of CPUs you want for the session. Note, you must select a GPU account and partition in order to use GPUs.

     \

  #. After you click Launch, you will be taken to the "My Interactive Sessions" screen where you can view the status of your session.

     .. figure:: images/ood/desktop-starting.png
        :alt: Open OnDemand "My Interactive Sessions" screen showing the Desktop session status: "Your session is currenlty starting...Please be patient as this process can take a few minutes."
        :width: 500

  #. Once your session has started, click the **Connect to Desktop** button to launch your Jupyter Lab environment. Note, this may take a few minutes.

     .. figure:: images/ood/desktop-connect.png
        :alt: Open OnDemand "My Interactive Sessions" screen showing the Desktop session with the "Connect to VS Code" button.
        :width: 500

  #. You're now in your VS Code environment on Delta. You can view the time remaining on your interactive sessions by clicking the Interactive Sessions button from the Open OnDemand dashboard.

     .. figure:: images/ood/ood-interactive-sessions-button.png
        :alt: Open OnDemand options at top of window with the Interactive Sessions button highlighted.
        :width: 750

Recommended noVNC Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- The Delta team recommends disabling compression for the best performance. Graphics performance will mostly depend on the graphics capabilities of your desktop computer. We have seen the best performance when using a gaming-style laptop with a discrete GPU.

  ..  figure:: images/services/ood-desktop-settings-compression.png
      :alt: noVNC Desktop settings window showing "Compression level" slider set all the way to the left (off).
      :width: 750

- Adjust the display resolution to best fit your browser tab and local display in the Linux desktop display settings. Right-click on the desktop background and select **Applications**, then **Settings**, then **Display**.

  ..  figure:: images/services/ood-desktop-settings-display.png
      :alt: In noVNC Desktop, right click the background and choose "Applications", then "Settings", then "Display".
      :width: 750

ImageMagick Example
~~~~~~~~~~~~~~~~~~~~

Here is an example showing ImageMagick running in OOD Desktop from ``/sw/external/ImageMagick/bin``.  

  ..  figure:: images/services/ood-desktop-magick.png
      :alt: Example showing ImageMagick in use via noVNC Desktop.
      :width: 750

Customizing Open OnDemand
----------------------------

- :ref:`custom_jupyterlab`
- :ref:`r_env`


Debugging Open OnDemand Problems
---------------------------------

For internal staff debugging (also useful for new OOD applications): `debugging jupyterlab, Open OnDemand <https://wiki.ncsa.illinois.edu/display/DELTA/debugging+jupyterlab+%2C+OpenOnDemand>`_.
