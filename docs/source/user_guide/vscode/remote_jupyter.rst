.. _remote-jupyter:

Run Jupyter on a Compute Node in VS Code
============================================

#. Follow the :ref:`vs-remote-ssh` instructions.

   You should now be on a Delta login node, which is not recommended for running big programs; the remaining steps will get you onto a compute node.

#. Install the **Jupyter** and **Python** VS Code extensions, if they aren't already installed.

   .. figure:: ../images/vscode/python-jupyter-extensions.png
      :alt: The python and jupyter extensions in the VS Code extensions marketplace.
      :figwidth: 600
      :width: 500

#. From the VS Code **Terminal** menu, open a **New Terminal**.

#. Run the following to see the available anaconda modules:

   .. code:: terminal
      module avail anaconda
#. Load the anaconda module that you want to use, the following example installs ``anaconda3_cpu``.

   .. code:: terminal
      module load anaconda3_cpu
#. Run the following command to verify Jupyter is in your path:

   .. code:: terminal
      which jupyter-notebook
#. Select one of the following tabs to connect to a compute node using ``srun`` or ``sbatch``.

   .. tabs::

      .. tab:: srun

         #. Generate a ``MYPORT`` number and copy it to a notepad (you will use it in a subsequent step).

            .. code:: terminal
   
               MYPORT=$(($(($RANDOM % 10000))+49152)); echo $MYPORT
   
         #. Find the account name that you are going to use and copy it to a notepad. Your available accounts are listed under **Project** when you run the ``accounts`` command. Note, to use a GPU compute node, you must pick a GPU account (the account name will end in "-gpu").

         #. Run the following ``srun`` command, with these replacements:

            - Replace ``<account_name>`` with the account you are going to use, which you found and copied in the previous step.
            - Replace ``<MYPORT>`` with the ``MYPORT`` number that you generated in a previous step.
            - Modify the ``--partition``, ``--time``, and ``--mem`` options and/or add other options to meet your needs.

            .. code-block:: terminal
   
               srun --account=<account_name> --partition=cpu-interactive --time=00:30:00 --mem=32g jupyter-notebook --no-browser --port=<MYPORT> --ip=0.0.0.0
   
         #. Copy the last five lines returned, beginning with "To access the notebook, ..."

         #. Complete the `Connect to a remote Jupyter server <https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server>`_ instructions.

            Use the **first URL** that you copied in the previous step as the URL of the running Jupyter Server.

         #. Select the **Python 3** kernel (recommended).

         #. You can run ``!hostnamectl``, in a notebook, to verify it is running on a compute node (**Static hostname** value).

            .. image:: ../images/vscode/vscode-jupyter-hostnamectl.png
               :alt: VS Code Jupyter notebook with a cell that ran !hostnamectl and returned static hostname value of a compute node.
               :width: 600

      .. tab:: sbatch

         #. Create a batch script for jupyter-notebook. In the following examples, at a minimum, replace the ``account`` and change the ``output`` log file name to a path/filename that you want to use.

            .. raw:: html

               <details>
               <summary><a><b>CPU example script</b> <i>(click to expand/collapse)</i></a></summary>

            .. code-block:: terminal
   
               #!/bin/bash
               #SBATCH -J Jupyter
               #SBATCH --output=./log/%j.out
               #SBATCH --account=bbka-delta-cpu
               #SBATCH --nodes=1
               #SBATCH --ntasks-per-node=1
               #SBATCH --partition=cpu-interactive
               #SBATCH --time=00:15:00
               #SBATCH --mem=32g
               #SBATCH --cpus-per-task=1
               srun jupyter-notebook --no-browser --ip=0.0.0.0
            .. raw:: html

               </details>

            .. raw:: html

               <details>
               <summary><a><b>GPU example script</b> <i>(click to expand/collapse)</i></a></summary>

            .. code-block:: terminal
   
               #!/bin/bash
               #SBATCH -J Jupyter
               #SBATCH --output=./log/%j.out
               #SBATCH --account=bbka-delta-gpu
               #SBATCH --nodes=1
               #SBATCH --ntasks-per-node=1
               #SBATCH --partition=gpuA40x4-interactive   # <-or one of: gpuA100x4 gpuA40x4 gpuA100x8 gpuMI100x8
               #SBATCH --time=00:15:00
               #SBATCH --mem=199g
               #SBATCH --cpus-per-task=1
               # # ### GPU options ###
               #SBATCH --gpus-per-node=1
               #SBATCH --gpus-per-task=1
               srun jupyter-notebook --no-browser --ip=0.0.0.0
            .. raw:: html

               </details>

         #. Run ``sbatch`` to execute your Slurm script. Replace ``filename`` with the name of your script file.

            .. code-block:: terminal
   
               sbatch filename.slurm
   
         #. Once the job is running, open the log file and copy the last five lines returned, beginning with "To access the notebook, ..."

         #. Complete the `Connect to a remote Jupyter server <https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server>`_ instructions.

            Use the **first URL** that you copied in the previous step as the URL of the running Jupyter Server.

         #. Select the **Python 3** kernel (recommended).

         #. You can run ``!hostnamectl``, in a notebook, to verify it is running on a compute node (**Static hostname** value).

            .. image:: ../images/vscode/vscode-jupyter-hostnamectl.png
               :alt: VS Code Jupyter notebook with a cell that ran !hostnamectl and returned static hostname value of a compute node.
               :width: 600

Run a Python Script File (.py) in a Jupyter Interactive Window
-----------------------------------------------------------------

After you've completed the above steps to connect to Jupyter on a compute node, use the following instructions to run a Python script file (.py) in a Jupyter interactive window.

#. Open your Python script file in VS Code.

   Adding ``# %%`` or ``# In[]`` in your python codes splits your code into many Jupyter-like code cells. Because the Jupyter extension is installed, **Run cell**, **Run Below**, and **Debug Cell** will show up before ``# %%`` or ``# In[]`` for each cell. 

#. Right-click and select **Run in an Interactive Window**.

   The interactive Jupyter window should now be linked to your .py file. Each time you click **Run Cell**, your code will run in the window.
   You may need to select or change your desired python kernel by clicking the **kernel select** button at the top right. 

   .. image:: ../images/vscode/vscode-run-interactive.png
      :alt: Python file opened with the right-click menu opened showing the run in interactive window option.
      :width: 700

|
