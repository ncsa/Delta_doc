.. _ood-custom-r:

How to Set Up an R Environment in JupyterLab in Open OnDemand
================================================================

R is available in JupyterLab by activating the environment via the ``anaconda_Rcpu`` module. 
R will run on the CPU cores (not GPU enabled).

#. Start a new :ref:`Jupyter Lab session in Open OnDemand <ood-jupyterlab>`.

#. In the JupyterLab **Launcher**, start a new **Terminal** session.

   .. figure:: ../images/ood/jupyter-terminal.png
      :alt: JupyterLab Launcher window with the Terminal button highlighted.
      :width: 750

#. If you are automatically launching a Conda environment in your default shell setup, deactivate it.

   .. code-block::

      $ conda deactivate

#. Load the R environment.

   .. code-block::        

      $ module load anaconda3_Rcpu

#. Launch R.

   .. code-block::

      $ R

#. You should now be in an R session (your terminal prompt will change from ``$`` to ``>``). Inside the R session, run ``IRkernel::installspec()``.

   .. code-block::

      > IRkernel::installspec()

#. Quit R.

   .. code-block:: 

      > q()

#. Close the **Terminal** window in Jupyterlab. That should return you to the JupyterLab **Launcher** (if it doesn't, open a new **Launcher** window). 

#. Reload the web page containing the **Launcher**. Options for an R notebook and console should be available. 

   ..  figure:: ../images/software/04_ood_launcher.png
       :alt: JupyterLab launcher window with R options.
       :width: 750

#. Proceed to use R.

   ..  figure:: ../images/software/05_r_example.png
       :alt: Example of using R in a Jupyter notebook.
       :width: 750

|
