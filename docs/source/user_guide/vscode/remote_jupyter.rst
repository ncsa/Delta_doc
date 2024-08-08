.. _remote-jupyter:

Run Jupyter on a Remote Compute Node Through VS Code
=======================================================

#. Open VS Code and install the **Jupyter** and **Python** extensions, if they aren't already installed.

#. Follow the :ref:`vs-remote-ssh` instructions.

   You should now be on a Delta login node, which is not recommended for running big programs. The next steps will get you onto a compute node.

#. From the VS Code **Terminal** menu, open a **New Terminal**.

#. Run the following to see the available anaconda modules.

   .. code:: terminal

      module avail anaconda

#. Load the anaconda module that you want to use, the following example installs ``anaconda3_cpu``.

   .. code:: terminal

      module load anaconda3_cpu

#. Run the following command to verify Jupyter is in your path.

   .. code:: terminal

      which jupyter-notebook

#. Use one of the following instructions to connect to a compute node using ``srun`` or ``sbatch``.

   .. tabs::
   
      .. tab:: ``srun``
   
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
   
            Use the **first URL** that you copied in the previous setp as the URL of the running Jupyter Server.
   
         #. Select the Python 3 kernel (recommended).
   
      .. tab:: sbatch
   
         #. Create an ``sbatch`` Slurm script for jupyter-notebook. Note, the following example is CPU-only. at a minimum, replace the ``account`` and change the ``output`` log file name to a path/filename that you want to use.
   
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
   
         #. Run ``sbatch`` to execute your Slurm script. Replace ``file-name`` with the name of your script file.
   
            .. code-block:: terminal
   
               sbatch file-name.slurm
   
         #. Once the job is running, open the log file and copy the last five lines returned, beginning with "To access the notebook, ..."
   
         #. Complete the `Connect to a remote Jupyter server <https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server>`_ instructions.
   
            Use the **first URL** that you copied in the previous step as the URL of the running Jupyter Server.
   
         #. Select the Python 3 kernel (recommended).


Run a Python Script File (.py) in a Jupyter Interactive Window
-----------------------------------------------------------------

After you've completed the above steps to connect to Jupyter on a compute node, use the following instructions to run a Python script file (.py) in a Jupyter interactive window.

#. Open your Python script file in VS Code.

   Adding **# %%** or **# In[]** in your python codes splits your code into many Jupyter-like code cells. Because the Jupyter extension is installed, **Run cell**,**Run Below**, and **Debug Cell** buttons will show up before ``# %%`` or ``# In[]`` for each cell. 

#. Right-click and select **Run in an Interactive Window**.

   The interactive jupyter window should now be linked to your .py file. Each time you click **Run Cell**, your code will be run in the window.
   You may need to select or change your desired python kernel by clicking the **kernel select** button at the top right. 

   You can confirm that you're running on the compute node (instead of a login node) by running ``!hostnaectl``, which prints the host information.

|
