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

The "-interactive" version of a partition is shown. Note those
partitions are for quick tests up to 30 minutes. Choose another
partition for longer sessions.

Partitions and accounts should match: gpu partitions go with gpu account
endings, cpu partitions with cpu account endings.

Options → Save Settings after filling in the above.

Proceeding with the tutorial, this is the view from the client and
noise.silo example (found in the visit installation data/) ...
