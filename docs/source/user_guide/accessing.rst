.. _access:

Delta Login Methods
=========================

The primary methods for logging into Delta are:

#. :ref:`direct_access` - Most common login method for users.
#. :ref:`openondemand` - Simplest login method, requiring only a web browser. Good for verifying that your account is working.
#. :ref:`vs_code`

.. _direct_access:

Direct Access Login Nodes
-----------------------------

Direct access to the Delta login nodes is via SSH using your NCSA username, password, and NCSA Duo MFA. The login nodes provide access to the CPU and GPU resources on Delta. See the `NCSA Allocation and Account Management <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_ page for links to NCSA Identity and NCSA Duo services. 

.. note::
   **ACCESS awarded projects** - Your NCSA username is in your `ACCESS Profile <https://allocations.access-ci.org/profile>`_; once logged in, scroll to the bottom of the page to the **Resource Provider Site Usernames** table. If you do not know your NCSA username, :ref:`submit a support request <help>` for assistance.

Login Node Hostnames
~~~~~~~~~~~~~~~~~~~~~~~

.. warning::

  In January 2024, Delta was upgraded to Slingshot11. Please use the round robin login, login.delta.ncsa.illinois.edu, to SSH into the system. For single host SSH, use dt-login03.delta.ncsa.illinois.edu or dt-login04.delta.ncsa.illinois.edu. See the `ACCESS Delta Notice: Delta maintenance 01-23-2024 - 01-25-2024 <https://operations.access-ci.org/node/671>`_ for more details. 

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

Use of SSH key pairs is disabled for general use.  This means that most individual users, even principal investigators (PIs), are **not allowed** to use SSH key pairs to log in instead of 2-factor authentication.  

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
---------------

General Interface
~~~~~~~~~~~~~~~~~~~~

Log into Delta in a web browser through the `general Open OnDemand interface <https://openondemand.delta.ncsa.illinois.edu/>`_.

#. In a web browser, navigate to the `general Open OnDemand interface <https://openondemand.delta.ncsa.illinois.edu/>`_.
#. Log in through CILogin with your **NCSA** username, password, and Duo MFA.
#. Once logged in, your Open OnDemand homescreen may look similar to the below. Navigate the system using the menu bar at the top of the window.

   .. figure:: images/accessing/open-ondemand-homescreen.png
      :alt: Open OnDemand homescreen showing the "files", "jobs", "culster", and "interactive apps" options in the menu bar at the top of the window.

Shell Interface
~~~~~~~~~~~~~~~~~

An `Open OnDemand shell interface <https://openondemand.delta.ncsa.illinois.edu/pun/sys/shell/ssh/dt-login>`_ is also available. There are two options for how to access this interface.

1. Delta Login Shell Interface - Option 1:

   A. In a web browser, navigate to the `Open OnDemand shell interface <https://openondemand.delta.ncsa.illinois.edu/pun/sys/shell/ssh/dt-login>`_.
   B. If prompted, Log in through CILogin with your **NCSA** username, password, and Duo MFA.
   C. Enter your **NCSA password** in the terminal inteface prompt and hit **enter/return**. **The terminal will not show your password (or placholder symbols such as *) as you enter your password, you just have to enter it blindly**.

      ..  figure:: images/accessing/Delta_OOD_terminal.png
          :alt: Black terminal with a command prompt that ends in "csteffen@dt-login's password:"
   D. Complete the Duo tow-factor authentication by either:

      i. Entering **1** and accepting the Duo push notfication on your phone OR 
      ii. Opening the Duo app on your phone and entering the NCSA passcode into the terminal prompt.

2. Delta Login Shell Interface - Option 2:

   A. In a web browser, navigate to the `general Open OnDemand interface <https://openondemand.delta.ncsa.illinois.edu/>`_.
   B. Log in through CILogin with your **NCSA** username, password, and Duo MFA.
   C. In the **Clusters** menu, select **>_Delta Shell Access**.

      .. figure:: images/accessing/open-ondemand-clusters-menu.png
         :alt: Open OnDemand interface showing the ">_Delta Shell Access" option in the "Clusters" menu.

   D. Enter your **NCSA password** in the terminal inteface prompt and hit **enter/return**. **The terminal will not show your password (or placholder symbols such as *) as you enter your password, you just have to enter it blindly**.

      ..  figure:: images/accessing/Delta_OOD_terminal.png
          :alt: Black terminal with a command prompt that ends in "csteffen@dt-login's password:"
   E. Complete the Duo tow-factor authentication by either:

      i. Entering **1** and accepting the Duo push notfication on your phone OR 
      ii. Opening the Duo app on your phone and entering the NCSA passcode into the terminal prompt.

.. _vs_code:

VS Code
-------
Refer to: `Visual Studio Code, Remote ssh <https://docs.ncsa.illinois.edu/systems/delta/en/latest/user_guide/prog_env.html#remote-ssh>`_
