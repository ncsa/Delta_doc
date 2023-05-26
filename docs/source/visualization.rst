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

Visit Client & Server
-------------------------

