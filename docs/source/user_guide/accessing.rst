.. _access:

Delta Login Methods
=========================

There are three primary methods for loggin into Delta:

#. :ref:`direct_access` - Most common login method for users.
#. :ref:`openondemand` - Simplest login method, requiring only a web browser. Good for verifying that your account is working.
#. :ref:`vs_code`

.. _direct_access:

Direct Access Login Nodes
-----------------------------

Direct access to the Delta login nodes is via SSH using your NCSA username, password, and NCSA Duo MFA. See the `NCSA Allocation and Account Management <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_ page for links to NCSA Identity and NCSA Duo services. The login nodes provide access to the CPU and GPU resources on Delta.

.. note::
   To verify your account is working, the simplest login method requires only a web browser (no additional software needed).  See the :ref:`openondemand` section.

See `NCSA Allocation and Account Management <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_ for the steps to change your NCSA password for direct access and set up NCSA Duo. 

For ACCESS awarded projects, to find your local NCSA username go to your `ACCESS Profile page <https://allocations.access-ci.org/profile>`_ and scroll to the bottom for the **Resource Provider Site Usernames** table. If you do not know your NCSA username, :ref:`submit a support request <help>` for assistance.

.. warning::

  In January 2024, Delta was upgraded to Slingshot11. Please use the round robin login, login.delta.ncsa.illinois.edu, to SSH into the system. For single host SSH, use dt-login03.delta.ncsa.illinois.edu or dt-login04.delta.ncsa.illinois.edu. See the `ACCESS Delta Notice: Delta maintenance 01-23-2024 - 01-25-2024 <https://operations.access-ci.org/node/671>`_ for more details. 

Login Node Hostnames
~~~~~~~~~~~~~~~~~~~~~~~

.. table:: Login Node Hostnames

   =======================================   ==============================
   Login Node Hostname                       Description
   =======================================   ==============================
   ``login.delta.ncsa.illinois.edu``         *This is the preferred hostname*. Alias that round robin logs into one of the two Delta login nodes. 
   ``dt-login.delta.ncsa.illinois.edu``      Alias that round robin logs into one of the two Delta login nodes.
   ``dt-login03.delta.ncsa.illinois.edu``    One of the two Delta login nodes.
   ``dt-login04.delta.ncsa.illinois.edu``    One of the two Delta login nodes.
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

Use of SSH key pairs is disabled for general use.  This means that most individual users, even PIs, are **not allowed** to use SSH key pairs to log in instead of 2-factor authentication.  

The one exception is: if you are the PI of a Gateway allocation (this is not most projects), then please :ref:`submit a support request <help>` to get the Gateway account's key pairs set up.  

Maintaining Persistent Sessions: tmux
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

tmux is available on the login nodes to maintain persistent sessions.
See the tmux man page for more information. 
After making note of the hostname, use the targeted login hostnames (dt-login01 or dt-login02) to attach to the login node where you started tmux. 
Avoid the round-robin hostname when using tmux.

SSH Keyboard-Interactive
~~~~~~~~~~~~~~~~~~~~~~~~~

For command line SSH clients, use the following settings if you have trouble logging in to Delta:

.. code-block::
   
   ssh -o PreferredAuthentications=keyboard-interactive,password

.. _openondemand:

Open OnDemand
-------------

Log into Delta in a web browser through the `general Open OnDemand interface <https://openondemand.delta.ncsa.illinois.edu/>`_.

#. In a web browser, navigate to the `general Open OnDemand interface <https://openondemand.delta.ncsa.illinois.edu/>`_.
#. Log in through CILogin with your **NCSA** username, password, and Duo MFA.
#. Once logged in, your Open OnDemand homescreen may look similar to the below. Navigate the system using the menu bar at the top of the window.

   .. figure:: images/accessing/open-ondemand-homescreen.png
      :alt: Open OnDemand homescreen showing the "files", "jobs", "culster", and "interactive apps" options in the menu bar at the top of the window.

An `Open OnDemand shell interface <https://openondemand.delta.ncsa.illinois.edu/pun/sys/shell/ssh/dt-login>`_ is also available. There are two options for how to access this interface.

#. Delta Login Shell Interface - Option 1:

   #. In a web browser, navigate to the `Open OnDemand shell interface <https://openondemand.delta.ncsa.illinois.edu/pun/sys/shell/ssh/dt-login>`_.
   #. If prompted, Log in through CILogin with your **NCSA** username, password, and Duo MFA.
   #. Enter your **NCSA password** in the terminal inteface prompt and hit **enter/return**. **The terminal will not show your password (or placholder symbols such as *) as you enter your password, you just have to enter it blindly**.

      ..  figure:: images/accessing/Delta_OOD_terminal.png
          :alt: Black terminal with a command prompt that ends in "csteffen@dt-login's password:"
   #. Complete the Duo tow-factor authentication by either:

      1. Entering **1** and accepting the Duo push notfication on your phone OR 
      2. Opening the Duo app on your phone and entering the NCSA passcode into the terminal prompt.

#. Delta Login Shell Interface - Option 2:

   #. In a web browser, navigate to the `general Open OnDemand interface <https://openondemand.delta.ncsa.illinois.edu/>`_.
   #. Log in through CILogin with your **NCSA** username, password, and Duo MFA.
   #. In the **Clusters** menu, select **>_Delta Shell Access**.

      .. figure:: images/accessing/open-ondemand-clusters-menu.png
         :alt: Open OnDemand interface showing the ">_Delta Shell Access" option in the "Clusters" menu.

   #. Enter your **NCSA password** in the terminal inteface prompt and hit **enter/return**. **The terminal will not show your password (or placholder symbols such as *) as you enter your password, you just have to enter it blindly**.

      ..  figure:: images/accessing/Delta_OOD_terminal.png
          :alt: Black terminal with a command prompt that ends in "csteffen@dt-login's password:"
   #. Complete the Duo tow-factor authentication by either:

      1. Entering **1** and accepting the Duo push notfication on your phone OR 
      2. Opening the Duo app on your phone and entering the NCSA passcode into the terminal prompt.

.. _vs_code:

VS Code
-------
Refer to: `Visual Studio Code, Remote ssh <https://docs.ncsa.illinois.edu/systems/delta/en/latest/user_guide/prog_env.html#remote-ssh>`_
