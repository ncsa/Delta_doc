Visualization
=====================

Delta A40 nodes support NVIDIA raytracing hardware.

-  describe visualization capabilities & software.
-  how to establish VNC/DVC/remote desktop

Paraview (Client/Server)
---------------------------

https://engaging-web.mit.edu/eofe-wiki/software/paraview_client_server_mode/

Seems **broken currently**, when setting up ssh tunnel as shown, get
this on the client side:

::

   Connection failed during handshake. 
   vtkSocketCommunicator::GetVersion()
    returns different values on the two connecting processes
    (Current value: 100).

| 

At least one site does not support client-server anymore (due to issues
like this):
https://help.itc.rwth-aachen.de/en/service/rhr4fjjutttf/article/b4a7b9e11b054a7d8096834ea03a1686/

pvpython and pvbatch work and are available:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suggest: https://www.paraview.org/Wiki/PvPython_and_PvBatch and using
just the pvbatch part of paraview:

::

   [arnoldg@dt-login02 ~]$ cd paraview_pvbatch/
   [arnoldg@dt-login02 paraview_pvbatch]$ vi greenSphere.py  # sample from URL above for pvpython
   [arnoldg@dt-login02 paraview_pvbatch]$ pvpython greenSphere.py 
   [arnoldg@dt-login02 paraview_pvbatch]$ ls
   greenSphere.py  greenSphereScreenshot.png

greenSphereScreenshot.png :

..  image:: aux_pages/images/paraview/greenSphere.png
    :alt: green sphere
    :width: 500px

Visit Client & Server
-------------------------

Following:
https://www.sdsc.edu/education_and_training/tutorials1/visit.html

Here are the screenshots for using Delta in a similar way:

pick a unique login node, .bashrc on delta

Choose either dt-login01 or dt-login02 (not dt-login) to keep ssh tunnel
connections working smoothly.

Be sure to ssh to that login node **before** you proceed (if you have
not logged into it before). Visit cannot deal with the initial login
confirmation of a new host key.

Add to your $HOME/.bashrc (for the remote visit gui):

module load visit

Adjust Maximum processors to fit your requirements.

..  image:: aux_pages/images/visit_client_server/01_visit_host_settings.png
    :alt: delta host profile settings
    :width: 1000px

..  image:: aux_pages/images/visit_client_server/02_visit-mpi-settings.png
    :alt: cpu interactive mpi launch profile
    :width: 1000px

The "-interactive" version of a partition is shown. Note those
partitions are for quick tests up to 30 minutes. Choose another
partition for longer sessions.

Partitions and accounts should match: gpu partitions go with gpu account
endings, cpu partitions with cpu account endings.

..  image:: aux_pages/images/visit_client_server/03_visit-mpi-parallel.png
    :alt: mpi parallel launch settings
    :width: 1000px

..  image:: aux_pages/images/visit_client_server/04_visit-mpi-parallel-adv.png
    :alt: mpi parallel advanced settings
    :width: 1000px

Options → Save Settings after filling in the above.

Proceeding with the tutorial, this is the view from the client and
noise.silo example (found in the visit installation data/) ...

..  image:: aux_pages/images/visit_client_server/05_visit-mpi-noise-final.png
    :alt: client view of noise example
    :width: 1000px
