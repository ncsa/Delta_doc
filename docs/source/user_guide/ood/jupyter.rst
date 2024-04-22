.. _ood-jupyterlab:

JupyterLab
============

The Open OnDemand dashboard provides an easy way to launch a JupyterLab environment on Delta.

How to Start an OOD JupyterLab Session
-----------------------------------------

#. Navigate to the `Open OnDemand dashboard <https://openondemand.delta.ncsa.illinois.edu/>`_.
#. Log in through CILogon with your **NCSA** username, password, and Duo MFA.
#. Open on the **Interactive Apps** menu at the top of the window and click **Jupyter Lab**.
#. Fill out the form and then click **Launch**.

   - **Name of account** - This must match one of your available Delta accounts (CPU or GPU, as appropriate); these are listed under ``Project`` when you run the ``accounts`` command on Delta.
   - **Partition** - Match your partition type to the type of account you entered. (If your account ends in "cpu", then your partition should start with "cpu". If your account ends in "gpu", then your partition should start with "gpu".)
   - **Duration of job** - Select your duration following the format example in the form. Note the duration limit for interactive partitions.
   - **Name of reservation** - Leave empty if none.
   - **Number of CPUs** - Select the number of CPUs you want for the session.
   - **Amount of RAM** - Select your RAM following the format example in the form. Note the default RAM assigned if left blank.
   - **Number of GPUs** - Select the number of GPUs you want for the session. Note, you must select a GPU account and partition to use GPUs.
   - **Working Directory** - Note the default directory if this is left blank.

   \

#. After you click **Launch**, you will be taken to **My Interactive Sessions** where you can view the status of your session.

   .. figure:: ../images/ood/jupyter-starting.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Jupyter Lab session status: "Your session is currently starting...Please be patient as this process can take a few minutes."
      :width: 500

#. Once your session has started, click **Connect to Jupyter** to launch your Jupyter Lab environment. Note, this may take a few minutes.

   .. figure:: ../images/ood/jupyter-connect.png
      :alt: Open OnDemand My Interactive Sessions screen showing the Jupyter Lab session with the Connect to Jupyter button.
      :width: 500

#. You are now in your JupyterLab environment on Delta. You can view the time remaining on your interactive sessions by clicking **My Interactive Sessions** from the Open OnDemand dashboard.

   .. figure:: ../images/ood/ood-interactive-sessions-button.png
      :alt: Open OnDemand options at top of window with the Interactive Sessions button highlighted.
      :width: 750

Jupyter Environments
----------------------

In OOD, Jupyter and JupyterLab will find the environments in your ``$HOME/.conda/envs``, your login shell should reflect what you want to see from Jupyter.

The available `conda-based environment kernels for Jupyter <https://github.com/Anaconda-Platform/nb_conda_kernels>`_ should be the same as what you see from a login shell and python3.

**Jupyter needs to be installed in every virtual environment where you want to use JupyterLab or Jupyter Notebook.**

  .. code-block:: terminal

     $ conda install jupyter

You can also :ref:`customize OOD JupyterLab with Anaconda environments <ood-custom-anaconda>`.

To see the possible Jupyter kernels for your current environment or module setup, run one of the following in a Delta terminal (:ref:`Open OnDemand shell <ood-shell-interface>` or :ref:`direct SSH <direct_access>`):

  - .. code-block:: terminal

       python3 -m nb_python_kernels list

  - .. code-block:: terminal

       jupyter-kernelspec list

  .. code-block::

     [arnoldg@dt-login03 ~]$ python3 -m nb_conda_kernels list
     [ListKernelSpecs] WARNING | Config option `kernel_spec_manager_class` not recognized by `ListKernelSpecs`.
     [ListKernelSpecs] [nb_conda_kernels] enabled, 8 kernels found
     Available kernels:
       conda-env-westpa20-py           /projects/bbka/arnoldg/westpa20/share/jupyter/kernels/python3
       conda-root-py                   /sw/external/python/anaconda3/share/jupyter/kernels/python3
       conda-env-anaconda3_Rcpu-r      /sw/external/python/anaconda3_rcpu/share/jupyter/kernels/ir
       conda-env-anaconda3_Rcpu-py     /sw/external/python/anaconda3_rcpu/share/jupyter/kernels/python3
       conda-env-westpa-2022.03-py     /sw/external/python/westpa-2022.03/share/jupyter/kernels/python3
       conda-env-.conda-myclone-py     /u/arnoldg/.conda/envs/myclone/share/jupyter/kernels/python3
       conda-env-.conda-mynewenv-r     /u/arnoldg/.conda/envs/mynewenv/share/jupyter/kernels/ir
       conda-env-.conda-mynewenv-py    /u/arnoldg/.conda/envs/mynewenv/share/jupyter/kernels/python3
       python3                         /sw/external/python/anaconda3_gpu/share/jupyter/kernels/python3

Debugging
------------

Debug JupyterLab from a terminal (:ref:`Open OnDemand shell <ood-shell-interface>` or :ref:`direct SSH <direct_access>`) with the ``jupyter-lab`` command. 

Of interest are the ``Searching`` path at the beginning, and the ``nb_conda_kernels`` outputs.

.. raw:: html
   
   <details>
   <summary><a><b>jupyter-lab --log-level=0</b> <i>(click to expand/collapse)</i></a></summary>

.. code-block::

   [arnoldg@dt-login03 ~]$ jupyter-lab --log-level=0
   [D 2023-02-20 12:48:50.533 ServerApp] Searching ['/u/arnoldg/.jupyter', '/u/arnoldg/.local/etc/jupyter', '/sw/external/python/anaconda3/etc/jupyter', 
   '/usr/local/etc/jupyter', '/etc/jupyter'] for config files
   [D 2023-02-20 12:48:50.533 ServerApp] Looking for jupyter_config in /etc/jupyter
   [D 2023-02-20 12:48:50.533 ServerApp] Looking for jupyter_config in /usr/local/etc/jupyter
   [D 2023-02-20 12:48:50.533 ServerApp] Looking for jupyter_config in /sw/external/python/anaconda3/etc/jupyter
   [D 2023-02-20 12:48:50.534 ServerApp] Loaded config file: /sw/external/python/anaconda3/etc/jupyter/jupyter_config.json
   [D 2023-02-20 12:48:50.534 ServerApp] Looking for jupyter_config in /u/arnoldg/.local/etc/jupyter
   [D 2023-02-20 12:48:50.534 ServerApp] Looking for jupyter_config in /u/arnoldg/.jupyter
   [D 2023-02-20 12:48:50.537 ServerApp] Looking for jupyter_server_config in /etc/jupyter
   [D 2023-02-20 12:48:50.537 ServerApp] Looking for jupyter_server_config in /usr/local/etc/jupyter
   [D 2023-02-20 12:48:50.537 ServerApp] Looking for jupyter_server_config in /sw/external/python/anaconda3/etc/jupyter
   [D 2023-02-20 12:48:50.537 ServerApp] Looking for jupyter_server_config in /u/arnoldg/.local/etc/jupyter
   [D 2023-02-20 12:48:50.537 ServerApp] Looking for jupyter_server_config in /u/arnoldg/.jupyter
   [D 2023-02-20 12:48:50.538 ServerApp] Paths used for configuration of jupyter_server_config: 
           /etc/jupyter/jupyter_server_config.json
   [D 2023-02-20 12:48:50.538 ServerApp] Paths used for configuration of jupyter_server_config: 
           /usr/local/etc/jupyter/jupyter_server_config.json
   [D 2023-02-20 12:48:50.539 ServerApp] Paths used for configuration of jupyter_server_config: 
           /sw/external/python/anaconda3/etc/jupyter/jupyter_server_config.d/jupyterlab.json
           /sw/external/python/anaconda3/etc/jupyter/jupyter_server_config.d/nbclassic.json
           /sw/external/python/anaconda3/etc/jupyter/jupyter_server_config.d/notebook_shim.json
           /sw/external/python/anaconda3/etc/jupyter/jupyter_server_config.d/panel-client-jupyter.json
           /sw/external/python/anaconda3/etc/jupyter/jupyter_server_config.json
   [D 2023-02-20 12:48:50.541 ServerApp] Paths used for configuration of jupyter_server_config: 
           /u/arnoldg/.local/etc/jupyter/jupyter_server_config.d/ipyparallel.json
           /u/arnoldg/.local/etc/jupyter/jupyter_server_config.json
   [D 2023-02-20 12:48:50.541 ServerApp] Paths used for configuration of jupyter_server_config: 
           /u/arnoldg/.jupyter/jupyter_server_config.json
   Note: detected 128 virtual cores but NumExpr set to maximum of 64, check "NUMEXPR_MAX_THREADS" environment variable.
   Note: NumExpr detected 128 cores but "NUMEXPR_MAX_THREADS" not set, so enforcing safe limit of 8.
   NumExpr defaulting to 8 threads.
   [I 2023-02-20 12:48:51.954 ServerApp] ipyparallel | extension was successfully linked.
   [W 2023-02-20 12:48:51.957 LabApp] Config option `kernel_spec_manager_class` not recognized by `LabApp`.
   [W 2023-02-20 12:48:51.958 LabApp] Config option `kernel_spec_manager_class` not recognized by `LabApp`.
   [W 2023-02-20 12:48:51.960 LabApp] Config option `kernel_spec_manager_class` not recognized by `LabApp`.
   [I 2023-02-20 12:48:51.961 ServerApp] jupyterlab | extension was successfully linked.
   [W 2023-02-20 12:48:51.962 NotebookApp] Config option `kernel_spec_manager_class` not recognized by `NotebookApp`.
   [W 2023-02-20 12:48:51.963 NotebookApp] Config option `kernel_spec_manager_class` not recognized by `NotebookApp`.
   [W 2023-02-20 12:48:51.965 NotebookApp] Config option `kernel_spec_manager_class` not recognized by `NotebookApp`.
   [I 2023-02-20 12:48:51.965 ServerApp] nbclassic | extension was successfully linked.
   [D 2023-02-20 12:48:51.968 ServerApp] Paths used for configuration of jupyter_notebook_config: 
           /u/arnoldg/.jupyter/jupyter_notebook_config.json
   [D 2023-02-20 12:48:51.968 ServerApp] Paths used for configuration of jupyter_notebook_config: 
           /etc/jupyter/jupyter_notebook_config.json
   [D 2023-02-20 12:48:51.969 ServerApp] Paths used for configuration of jupyter_notebook_config: 
           /usr/local/etc/jupyter/jupyter_notebook_config.json
   [D 2023-02-20 12:48:51.969 ServerApp] Paths used for configuration of jupyter_notebook_config: 
           /sw/external/python/anaconda3/etc/jupyter/jupyter_notebook_config.d/jupyterlab.json
           /sw/external/python/anaconda3/etc/jupyter/jupyter_notebook_config.d/panel-client-jupyter.json
           /sw/external/python/anaconda3/etc/jupyter/jupyter_notebook_config.json
   [D 2023-02-20 12:48:51.971 ServerApp] Paths used for configuration of jupyter_notebook_config: 
           /u/arnoldg/.local/etc/jupyter/jupyter_notebook_config.d/ipyparallel.json
           /u/arnoldg/.local/etc/jupyter/jupyter_notebook_config.json
   [D 2023-02-20 12:48:51.971 ServerApp] Paths used for configuration of jupyter_notebook_config: 
           /u/arnoldg/.jupyter/jupyter_notebook_config.json
   [I 2023-02-20 12:48:51.971 ServerApp] notebook_shim | extension was successfully linked.
   [I 2023-02-20 12:48:51.972 ServerApp] panel.io.jupyter_server_extension | extension was successfully linked.
   [D 2023-02-20 12:48:51.972 ServerApp] Config changed: {'JupyterApp': {'kernel_spec_manager_class': 'nb_conda_kernels.CondaKernelSpecManager'}, 'NotebookApp': 
   {}, 'ServerApp': {'log_level': 0, 'jpserver_extensions': <LazyConfigValue value={'jupyterlab': True, 'ipyparallel': True, 'nbclassic': True, 'notebook_shim': True, 'panel.io.jupyter_server_extension': True}>}}
   [D 2023-02-20 12:48:51.972 ServerApp] Raising open file limit: soft 1024->4096; hard 262144->262144
   [D 2023-02-20 12:48:51.972 ServerApp] [nb_conda_kernels] refreshing conda info
   [I 2023-02-20 12:48:54.607 ServerApp] [nb_conda_kernels] enabled, 8 kernels found
   [I 2023-02-20 12:48:54.645 ServerApp] notebook_shim | extension was successfully loaded.
   [I 2023-02-20 12:48:54.648 ServerApp] Loading IPython parallel extension
   [I 2023-02-20 12:48:54.648 ServerApp] ipyparallel | extension was successfully loaded.
   [I 2023-02-20 12:48:54.649 LabApp] JupyterLab extension loaded from /sw/external/python/anaconda3/lib/python3.9/site-packages/jupyterlab
   [I 2023-02-20 12:48:54.649 LabApp] JupyterLab application directory is /sw/external/python/anaconda3/share/jupyter/lab
   [I 2023-02-20 12:48:54.652 ServerApp] jupyterlab | extension was successfully loaded.
   [I 2023-02-20 12:48:54.660 ServerApp] nbclassic | extension was successfully loaded.
   [I 2023-02-20 12:48:54.660 ServerApp] panel.io.jupyter_server_extension | extension was successfully loaded.
   [I 2023-02-20 12:48:54.661 ServerApp] The port 8888 is already in use, trying another port.
   [I 2023-02-20 12:48:54.661 ServerApp] Serving notebooks from local directory: /u/arnoldg/.local/etc/jupyter/jupyter_notebook_config.d
   [I 2023-02-20 12:48:54.661 ServerApp] Jupyter Server 1.23.4 is running at:
   [I 2023-02-20 12:48:54.661 ServerApp] http://localhost:8889/lab?token=a728f76b935d157d2eecc6a32810cf4e88ae1bc53701f4f6
   [I 2023-02-20 12:48:54.661 ServerApp]  or http://127.0.0.1:8889/lab?token=a728f76b935d157d2eecc6a32810cf4e88ae1bc53701f4f6
   [I 2023-02-20 12:48:54.661 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
   [C 2023-02-20 12:48:54.880 ServerApp] 
       
       To access the server, open this file in a browser:
           file:///u/arnoldg/.local/share/jupyter/runtime/jpserver-1287615-open.html
       Or copy and paste one of these URLs:
           http://localhost:8889/lab?token=a728f76b935d157d2eecc6a32810cf4e88ae1bc53701f4f6
        or http://127.0.0.1:8889/lab?token=a728f76b935d157d2eecc6a32810cf4e88ae1bc53701f4f6
   /usr/bin/xdg-open: line 862: x-www-browser: command not found
   /usr/bin/xdg-open: line 862: firefox: command not found
   /usr/bin/xdg-open: line 862: iceweasel: command not found
   /usr/bin/xdg-open: line 862: seamonkey: command not found
   /usr/bin/xdg-open: line 862: mozilla: command not found
   /usr/bin/xdg-open: line 862: epiphany: command not found
   /usr/bin/xdg-open: line 862: konqueror: command not found
   /usr/bin/xdg-open: line 862: chromium: command not found
   /usr/bin/xdg-open: line 862: chromium-browser: command not found
   /usr/bin/xdg-open: line 862: google-chrome: command not found
   /usr/bin/xdg-open: line 862: www-browser: command not found
   /usr/bin/xdg-open: line 862: links2: command not found
   /usr/bin/xdg-open: line 862: elinks: command not found
   /usr/bin/xdg-open: line 862: links: command not found
   /usr/bin/xdg-open: line 862: lynx: command not found
   /usr/bin/xdg-open: line 862: w3m: command not found
   xdg-open: no method available for opening 'file:///u/arnoldg/.local/share/jupyter/runtime/jpserver-1287615-open.html'

.. raw:: html

   </details>
|

|
