Customizing Jupyter Lab with Anaconda Environments
====================================================

#. Load an **anaconda_<cpu, gpu, mi100>** that you want to use as your base installation and initialize your default login shell to use conda environments.

   **conda init bash:**

   .. code-block::

      [arnoldg@dt-login03 scripts]$ module load anaconda3_cpu
      [arnoldg@dt-login03 scripts]$ conda init bash
      ...
      [arnoldg@dt-login03 scripts]$ bash
      (base) 

   After you have run ``conda init bash`` you will not need to load **anaconda3_cpu** (or **gpu**) modules again. Just use your new custom environment.

   .. note::
      You may see error messages from conda init bash above. 
      Just **control-c** through them and continue. 
      As long as conda added code to the end of your ``.bashrc`` (or similar for other shells), things will work properly.

#. Start a new shell with bash or a new terminal or login session with Delta. 
   You'll now see this prompt showing that you are within the conda environment you initially chose. 
   If you want to change environments later (say to **anaconda3_mi100**) you can edit your ``.bashrc`` and do another ``conda init bash`` with that new module loaded.

   To create a new custom environment, you have 2 options:

   a. Create a new empty environment:

      .. note::
         If you will be making custom environments for more than one partition type (cpu, gpu, mi100), it may be helpful to include that metadata in the name of your environment.

      Install jupyter into the environment in order to use it with Open OnDemand. This option adds about 150 python modules to your environment and requires about 1.3 GB in your ``$HOME``. Setup time: about 10 minutes.

      .. raw:: html

         <details>
         <summary><a><b>conda create --name mynewenv</b> <i>(click to expand/collapse)</i></a></summary>

      #. Create new conda environment

         .. code-block::

            (base) conda create --name mynewenv

            Collecting package metadata (current_repodata.json): done
            Solving environment: done

            ## Package Plan ##

              environment location: /u/arnoldg/.conda/envs/mynewenv

            Proceed ([y]/n)? y

            Preparing transaction: done
            Verifying transaction: done
            Executing transaction: done
            #
            # To activate this environment, use
            #
            #     $ conda activate mynewenv
            #
            # To deactivate an active environment, use
            #
            #     $ conda deactivate

      #. Activate the new environment.

         .. code-block::   

            (base) conda activate mynewenv

      #. Install Jupyter into the new environment.

         .. code-block::

            (mynewenv) conda install jupyter

            Collecting package metadata (current_repodata.json): done
            Solving environment: done
  
            ## Package Plan ##

              environment location: /u/arnoldg/.conda/envs/mynewenv

              added / updated specs:
                - jupyter


            The following NEW packages will be INSTALLED:

              _libgcc_mutex      pkgs/main/linux-64::_libgcc_mutex-0.1-main None
              _openmp_mutex      pkgs/main/linux-64::_openmp_mutex-5.1-1_gnu None
              anyio              pkgs/main/linux-64::anyio-3.5.0-py310h06a4308_0 None
              argon2-cffi        pkgs/main/noarch::argon2-cffi-21.3.0-pyhd3eb1b0_0 None
            ...

            Proceed ([y]/n)? y

       #. Verify Jupyter installs.

          .. code-block::

             (mynewenv) conda list | grep jupyter
             jupyter                   1.0.0           py310h06a4308_8  
             jupyter_client            7.3.5           py310h06a4308_0  
             jupyter_console           6.4.3              pyhd3eb1b0_0  
             jupyter_core              4.11.1          py310h06a4308_0  
             jupyter_server            1.18.1          py310h06a4308_0  
             jupyterlab                3.4.4           py310h06a4308_0  
             jupyterlab_pygments       0.1.2                      py_0  
             jupyterlab_server         2.15.2          py310h06a4308_0  
             jupyterlab_widgets        1.0.0              pyhd3eb1b0_1  
        
          .. code-block::

             (mynewenv) conda list | wc -l
             152

          .. code-block::

             (mynewenv) du -sh $HOME/.conda/envs/mynewenv
             1.3G    /u/arnoldg/.conda/envs/mynewenv

      .. raw:: html

         </details>

   OR 

   b. Create a new clone of your chosen **anaconda3_<cpu, gpu, mi100>** module:

      Jupyter (and everything else from your loaded **anaconda3\_** module will be copied into this environment). 
      This option adds about 500 python modules to your environment and requires about 6.3 GB in your ``$HOME``. Install time can be up to 30 minutes.

      .. raw:: html

         <details>
         <summary><a><b>conda create --name myclone</b> <i>(click to expand/collapse)</i></a></summary>

      .. code-block::

         (base) time conda create --name myclone --clone base 
         Source:      /sw/external/python/anaconda3_cpu
         Destination: /u/arnoldg/.conda/envs/myclone
         The following packages cannot be cloned out of the root environment:
          - defaults/linux-64::conda-env-2.6.0-1
          - defaults/linux-64::conda-22.9.0-py39h06a4308_0
          - defaults/linux-64::conda-build-3.21.8-py39h06a4308_2
          - defaults/noarch::conda-token-0.4.0-pyhd3eb1b0_0
          - defaults/linux-64::_anaconda_depends-2022.05-py39_0
          - defaults/linux-64::anaconda-navigator-2.1.4-py39h06a4308_0
          - defaults/linux-64::anaconda-custom-py39_1
         Packages: 447
         Files: 24174
         Preparing transaction: done
         Verifying transaction: done
         Executing transaction: \ 
         ...

         Retrieving notices: ...working... done

         real    24m10.605s
         user    0m54.353s
         sys     1m56.843s 
         (base) conda activate myclone
         (myclone) conda list | wc -l
         501
         (myclone) du -sh $HOME/.conda/envs/myclone
         6.3G    /u/arnoldg/.conda/envs/myclone

      .. raw:: html

         </details>

#. Initiate and launch an :ref:`Open OnDemand Jupyter session <ood-jupyter>`.

#. In Jupyter Lab, hover over items in the Launcher view to see which environment will be used, selecting the one you want for this session.

   ..  image:: ../images/software/02_jupyter-mynewenv.png
       :alt: select environment
       :width: 750

#. Change your kernel to match if you are opening a notebook from a different environment.

   ..  image:: ../images/software/03_mynewenv-kernel.png
       :alt: match kernel
       :width: 750

|
