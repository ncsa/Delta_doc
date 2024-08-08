.. _remote-jupyter:

Run Jupyter on a Remote Compute Node Through VS Code
=======================================================

#. Open VS Code and install the **Jupyter** and **Python** extensions, if they aren't already installed.

#. Follow the :ref:`vs-remote-ssh` instructions.

   You should now be on a Delta login node, which is not recommended for running big programs. The next steps will get you onto a compute node.

#. From the VS Code **Terminal** menu, open a **New Terminal**.

#. Run to see the available anaconda modules.

   .. code:: terminal

      module avail anaconda

#. Load the anaconda module that you want to use, the following example installs ``anaconda3_cpu``.

   .. code:: terminal

      module load anaconda3_cpu

#. Run the following command to verify Jupyter is in your path.

   .. code:: terminal

      which jupyter-notebook

.. tabs::

   .. tab:: srun

      #. Generate a MYPORT number and copy it to a notepad (you will use it in a subsequent step).

         .. code:: terminal

            MYPORT=$(($(($RANDOM % 10000))+49152)); echo $MYPORT

      #. Find the account name that you are going to use and copy it to a notepad. Your available accounts are listed under **Project** when you run the ``accounts`` command. Note, to use a GPU compute node, you must pick a GPU account (the account name will end in "-gpu").

      #. Run the following ``srun`` command, with these replacements:

         - Replace <account_name> with the account you are going to use, which you found and copied in the previous step.
         - Replace <$MYPORT> with the MYPORT number that you generated in a previous step.
         - Modify the ``--partition``, ``--time``, and ``--mem`` options and/or add other options to meet your needs.

         .. code-block:: terminal

            srun --account=<account_name> --partition=cpu-interactive --time=00:30:00 --mem=32g jupyter-notebook --no-browser --port=<MYPORT> --ip=0.0.0.0

      #. Copy the last five lines returned (beginning with "To access the notebook, ..."

      #. Complete the `Connect to a Remote Jupyter <https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server>`_ instructions.

         Use the first URL that you copied in the previous setp as teh URL of the running Jupyter Server.

      #. Select the Python 3 kernel (recommended).


|

..
   #. Open the following documents in new browser tabs:
   
      - `VS Code connect to a remote Jupyter server <https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_connect-to-a-remote-jupyter-server>`_    
      - :ref:`Delta - Jupyter Notebooks <jupyter>`
   
   #. Install the **Jupyter** extension in VS Code, if you have not already done so.
   
   #. Complete **steps 1 thru 13** of How to Run Jupyter on a Compute Node from Delta - Jupyter Notebooks (second link above). 
   
   #. Follow the VS Code connect to a remote Jupyter server instructions (first link above). The **second URL** from your ``srun`` output in **step 10** of How to Run Jupyter on a Compute Node is the URL you will use for the running Jupyter server.
   
   ..  image:: ../images/prog_env/jupyter-vscode.png
       :alt: VS Code Jupyter Notebook with the second URL pasted into the Jupyter server remote URL field.
       :width: 1000px
