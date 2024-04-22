Visualization
=====================

Delta A40 nodes support NVIDIA ray tracing hardware.

ParaView 
----------

Client Server Mode - unsupported
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

`MIT Engaging cluster ParaView client server mode documentation <https://engaging-web.mit.edu/eofe-wiki/software/paraview_client_server_mode/>`_.

Client server mode appears **broken**. When setting up SSH tunnel, as shown, you get this on the client side:

.. code-block::

   Connection failed during handshake. 
   vtkSocketCommunicator::GetVersion()
    returns different values on the two connecting processes
    (Current value: 100).

At least one site does not support client-server anymore (due to issues like this one from the `RWTH HPC IT Center help page <https://help.itc.rwth-aachen.de/en/service/rhr4fjjutttf/article/b98c687822874a30b740ef09f4330e7b/>`_).

PvPython and PvBatch
~~~~~~~~~~~~~~~~~~~~~

PvPython and PvBatch work and are available. Suggest reviewing the `ParaView PvPython and PvBatch wiki <https://www.paraview.org/Wiki/PvPython_and_PvBatch>`_ and using only the PvBatch part of ParaView:

.. code-block::

   [arnoldg@dt-login02 ~]$ cd paraview_pvbatch/
   [arnoldg@dt-login02 paraview_pvbatch]$ vi greenSphere.py  # sample from URL above for pvpython
   [arnoldg@dt-login02 paraview_pvbatch]$ pvpython greenSphere.py 
   [arnoldg@dt-login02 paraview_pvbatch]$ ls
   greenSphere.py  greenSphereScreenshot.png

greenSphereScreenshot.png:

..  image:: images/visualization/greenSphere.png
    :alt: green sphere
    :width: 500px

VisIt
--------

`VisIt <https://visit-dav.github.io/visit-website/>`_ is an open-source visualization and data analysis tool. 

How to Use VisIt in Open OnDemand (OOD)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. :ref:`Start an OOD Desktop session <ood-start-desktop>`.

#. In the Desktop app, open a **Terminal**.

   .. figure:: images/visualization/ood-desktop-terminal-icon.png
      :alt: OOD Desktop app with the terminal emulator icon at the bottom of the screen highlighted.
      :width: 500

#. Load VisIt.

   .. code-block::

      $ module load visit

#. Start VisIt.

   .. code-block::

      $ visit

To load the VisIt example ``noise.silo`` data, follow these steps:

#. Under **Sources**, click **Open**.

   .. figure:: images/visualization/ood-desktop-visit-open.png
      :alt: VisIt opened in the OOD Desktop app with the Open button highlighted.
      :width: 500

#. In **Path**, navigate to ``/sw/external/visit/visit3_3_3.linux-x86_64/data`` and select the ``noise.silo`` file.

   .. figure:: images/visualization/ood-desktop-visit-data-path.png
      :alt: VisIt File open window showing the "/sw/external/visit/visit3_3_3.linux-x86_64/data" path with the noise.silo file selected.
      :width: 500

#. Click **Add** and select **Volume**, then **hardyglobal**.

   .. figure:: images/visualization/ood-desktop-visit-add-volume.png
      :alt: VisIt Add menu showing Volume, and then hardyglobal selected.
      :width: 500

#. Click **Draw**. The data will render in the adjacent window.

   .. image:: images/visualization/ood-desktop-visit-draw.png
      :alt: The VisIt Draw button.
      :width: 500

|

.. The below VisIt client-server mode info is commented out because we have trouble getting it to work properly. 

.. VisIt Client-Server Mode
   -------------------------

   Following the `SDSC VisIt getting started guide <https://www.sdsc.edu/education_and_training/tutorials1/visit.html>`_, below are the screenshots and setup for using Delta in a similar way.

   .. note::
      **Pick a unique login node, .bashrc on Delta.** Choose one of dt-login01 through dt-login04 to keep SSH tunnel connections working smoothly. Be sure to SSH to that login node **before** you proceed (if you have not logged into it before). VisIt cannot deal with the initial login confirmation of a new host key.
   
      Add to your $HOME/.bashrc (for the remote VisIt GUI):

      ``module load visit``

   Get a batch allocation on a compute node and run ``visit`` in that allocation with ``srun``.  Enable ``x11`` forwarding.

   .. code-block::

      salloc --mem=32g --nodes=1 --ntasks-per-node=1 --cpus-per-task=16 --partition=cpu,cpu-interactive --account=bbka-delta-cpu --constraint=scratch --x11 --time=00:30:00
      salloc: Pending job allocation 3063018
      salloc: job 3063018 queued and waiting for resources
      salloc: job 3063018 has been allocated resources
      salloc: Granted job allocation 3063018
      salloc: Waiting for resource configuration
      salloc: Nodes cn095 are ready for job
      [arnoldg@dt-login02 c]$ srun visit
      Running: gui3.3.3
      Running: viewer3.3.3 -geometry 1499x1080+421+0 -borders 40,11,11,11 -shift 0,0 -preshift 1,30 -defer -host 127.0.0.1 -port 5600
      Running: mdserver3.3.3 -host 127.0.0.1 -port 5601


   Fill in **Host Settings** and under **Launch Profiles**, adjust **Number of threads per task** to fit your requirements and the ``--cpus-   per-task`` from ``salloc`` above:

   ..  image:: images/visualization/01_visit-host-settings.png
       :alt: delta host profile settings
       :width: 1000px

   ..  image:: images/visualization/02_visit-thread-settings16.png
       :alt: delta host profile settings
       :width: 1000px

   Leave the **Parallel** tab options unchecked; since this example is not using MPI, that tab isn't applicable.


   **Options** → **Save Settings** after filling in the above.

   Proceeding with the tutorial, this is the view from the client and noise.silo example (found in the VisIt installation data/):

   ..  image:: images/visualization/05_visit-mpi-noise-final.png
       :alt: client view of noise example
       :width: 1000px

|
