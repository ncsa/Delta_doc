Using R in Jupyter Lab
========================

R is available in JupyterLab by activating the environment via the module **anaconda_Rcpu**. 
R will run on the CPU cores (not GPU enabled).

How to Set Up the R Environment for Jupyter Lab in Open OnDemand
-------------------------------------------------------------------

#. Start a new :ref:`Jupyter Lab session in Open OnDemand <ood-jupyter>`.

#. In the JupyterLab Launcher, start a new **Terminal** session.

   .. figure:: ../images/ood/jupyter-terminal.png
      :alt: JupyterLab Launcher window with the Terminal button highlighted.
      :width: 750

#. If you are automatically launching a Conda environment in your default shell setup, **deactivate** it now:

   .. code-block::

      $ conda deactivate

#. **Load** the R environment

   .. code-block::        

      $ module load anaconda3_Rcpu

#. **Launch** R:

   .. code-block::

      $ R

#. You should now be in an R session (your terminal prompt will change from $ to >). Inside the R session, **run**:

   .. code-block::

      > IRkernel::installspec()

#. **Quit** R 

   .. code-block:: 

      > q()

#. Close the **Terminal** window in Jupyterlab. That should return you to the JupyterLab Launcher (if it doesn't, open a new Launcher window). 

#. **Reload** the web page containing the Launcher, and options for an R Notebook and an R Console should be available. 

   ..  figure:: ../images/software/04_ood_launcher.png
       :alt: R launcher options
       :width: 750

#. Proceed to use R:

   ..  figure:: ../images/software/05_r_example.png
       :alt: example of using R
       :width: 750
