.. _access:

Delta Login Methods
=========================

.. note::
   If you don't have an allocation on Delta, go to `Delta Allocations <https://delta.ncsa.illinois.edu/delta-allocations/>`_ to learn how to submit an allocation request.

Once you have a Delta allocation, the primary methods for logging into Delta are:

- :ref:`direct_access` - Most common login method for users.
- :ref:`openondemand` - Simplest login method; uses a web browser. Good for verifying that your account is working.
- :ref:`VS Code <vs-remote-ssh>`

.. _direct_access:

Direct Access Login Nodes
-----------------------------

Direct access to the Delta login nodes is via SSH using your NCSA username, password, and NCSA Duo MFA. The login nodes provide access to the CPU and GPU resources on Delta. See the `NCSA Allocation and Account Management <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_ page for links to NCSA Identity and NCSA Duo services. 

**ACCESS awarded projects** - Your NCSA username is in your `ACCESS Profile <https://allocations.access-ci.org/profile>`_; once logged in, scroll to the bottom of the page to the "Resource Provider Site Usernames" table. If you don't know your NCSA username, :ref:`submit a support request <help>` for assistance.

Login Node Hostnames
~~~~~~~~~~~~~~~~~~~~~~~

.. warning::

  In January 2024, Delta was upgraded to Slingshot11. Please use the round robin login, login.delta.ncsa.illinois.edu, to SSH into the system. For single host SSH, use dt-login01.delta.ncsa.illinois.edu, dt-login02.delta.ncsa.illinois.edu, or dt-login03.delta.ncsa.illinois.edu. See the `ACCESS Delta Notice: Delta maintenance 01-23-2024 - 01-25-2024 <https://operations.access-ci.org/node/671>`_ for more details. 

.. table:: Login Node Hostnames

   =======================================   ==============================
   Login Node Hostname                       Description
   =======================================   ==============================
   ``login.delta.ncsa.illinois.edu``         *This is the preferred hostname*. Alias that round robin logs into one of the two Delta login nodes. 
   ``dt-login.delta.ncsa.illinois.edu``      Alias that round robin logs into one of the two Delta login nodes.
   ``dt-login01.delta.ncsa.illinois.edu``    One of the Delta login nodes.
   ``dt-login02.delta.ncsa.illinois.edu``    One of the Delta login nodes.
   ``dt-login03.delta.ncsa.illinois.edu``    One of the Delta login nodes.
   =======================================   ==============================

SSH Examples
~~~~~~~~~~~~~~

In the examples below, replace ``username`` with your Delta login username.

- Round robin log into a login node

  .. code-block:: terminal

     ssh username@login.delta.ncsa.illinois.edu

- ``-l username`` is an alternative syntax for ``<user>@<host>``

  .. code-block:: terminal

     ssh -l username login.delta.ncsa.illinois.edu

- ``-Y`` allows X11 forwarding from Linux hosts

  .. code-block:: terminal

     ssh -Y username@login.delta.ncsa.illinois.edu

Use of SSH key pairs is disabled for general use.  This means that most individual users, even principal investigators (PIs), are **not allowed** to use SSH key pairs to log in instead of 2-factor authentication.  

The one exception is: if you are the PI of a Gateway allocation (this is not most projects), then please :ref:`submit a support request <help>` to get the Gateway account's key pairs set up.  

Maintaining Persistent Login Sessions: tmux
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The `tmux <https://github.com/tmux/tmux/wiki>`_ utility is available on login nodes to maintain persistent login shells.  This is a great technique to keep your shell alive for days and between network disconnects.  
 
After making note of the hostname, use the targeted login hostnames (dt-login01, dt-login02, dt-login03, or dt-login04) to attach to the login node where you started tmux. 
Avoid the round-robin hostname when using tmux.

See the tmux man page for more information.

SSH Keyboard-Interactive
~~~~~~~~~~~~~~~~~~~~~~~~~

For command line SSH clients, use the following settings if you have trouble logging in to Delta:

.. code-block::
   
   ssh -o PreferredAuthentications=keyboard-interactive,password

.. _openondemand:

Open OnDemand
---------------

With Open OnDemand (OOD), you can access Delta, in a web browser! Go to :ref:`Open OnDemand on Delta <open-ondemand>`, for more OOD topics including:

  - Shell interface.
  - Interactive apps: Jupyter Lab, Code Server (VS Code), TensorBoard, and Desktop (virtual Linux desktop).
  - Jupyter Lab customization for Anaconda Environments and R.

How to Log Into the Delta OOD Dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Navigate to the `Open OnDemand dashboard <https://openondemand.delta.ncsa.illinois.edu/>`_.
#. Log in through CILogon with your **NCSA** username, password, and Duo MFA.
#. Once logged in, navigate the dashboard using the menu bar at the top of the window.

   .. figure:: images/accessing/open-ondemand-homescreen.png
      :alt: Open OnDemand home screen showing the "files", "jobs", "clusters", "interactive apps", and "my interactive sessions" options in the menu bar at the top of the window.

.. _vs_code:

VS Code
-------
Refer to :ref:`Visual Studio Code, Remote - SSH <vs-remote-ssh>`

|
