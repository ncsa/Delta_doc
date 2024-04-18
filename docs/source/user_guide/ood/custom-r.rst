Using R in Jupyter Lab
========================

R is available in JupyterLab by activating the environment via the module **anaconda_Rcpu**. 
Append the module load line to your ``.bashrc``. 
R will run on the CPU cores (not GPU enabled).

There are a few steps needed to set up the R environment for JupyterLab in Open OnDemand.

#. Start a new **JupyterLab** session in Open OnDemand.
#. Start a new **Terminal** session in the JupyterLab Launcher.
#. If you are automatically launching a Conda environment in your default shell setup, **deactivate** it now:

   .. code-block::

      $ conda deactivate

#. **Load** the R environment and **launch** R:

   .. code-block::        

      $ module load anaconda3_Rcpu

      $ R

#. That should start a new R session. Inside the R session, **run**:

   .. code-block::

      > IRkernel::installspec()

#. **Quit** R and close the **Terminal** window in Jupyterlab. 

#. That should return you to the JupyterLab Launcher. **Reload** the web page containing the Launcher, and options for an R Notebook and an R Console should be available. JupyterLab from the Open OnDemand interface will automatically offer you the R options with the Launcher.

   ..  image:: ../images/software/04_ood_launcher.png
       :alt: R launcher options
       :width: 1000px

#. Proceed to use R:

   ..  image:: ../images/software/05_r_example.png
       :alt: example of using R
       :width: 1000px
