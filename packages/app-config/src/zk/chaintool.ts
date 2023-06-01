// Copyright 2021-2023 zcloak authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ZkProgramConfig, ZkProgramOption } from './types';

import { ZKSBT_CTYPE } from '../contract';

function getPublicInput() {
  const currentDate = new Date();
  const compareDate = currentDate.setFullYear(currentDate.getFullYear() - 18);

  return `${Math.floor(new Date(compareDate).getTime())}`;
}

const config: ZkProgramConfig[] = [
  {
    name: 'Adult Check',
    description: 'Check you are adult.',
    author: 'did:zk:0xdC6BF231a4f18074288C07C3f31f2eD170E368aD',
    program: `proc.number_add.4
    dup.0 loc_store.0 push.0 eq
    push.0 loc_store.3
    if.true
        dup.0 push.128 lt
        if.true
            dup.0
        else
            push.0
        end
    else
        push.1.1 loc_store.1
        while.true
            loc_load.1 dup.0
            add.1 loc_store.1 sub.1 dup.0 push.0 gt
            if.true
                push.1
                while.true
                    push.256 swap sub.1 dup.0 push.0 gt
                end
                drop
            else
                drop
            end
            loc_load.1 dup.0 loc_store.1 sub.1 dup.0 loc_store.2 push.1 gt
            while.true
                mul loc_load.2 sub.1 dup.0 loc_store.2 push.1 gt
            end
            loc_load.3 add loc_store.3
            loc_load.1 dup.0 loc_store.1
            loc_load.0 dup.0 loc_store.0 lte
        end
        loc_load.3
    end
    swap drop
end

proc.read_and_copy.60
    mem_load.99 dup.0 mem_store.99 dup.0 push.0 eq
    if.true
        drop drop dup.0 adv_push.7
    else
        swap dup.1 sub loc_store.0 adv_push.1 swap dup.0 sub.1 push.0 gt
        while.true
            adv_push.1 swap sub.1 dup.0 push.1 gt
        end
        drop mem_load.99 dup.0 mem_store.99 add.1
        dup.0 u32checked_mod.4 loc_store.1 u32checked_div.4 add.50
        loc_store.2 mem_storew.50 dropw push.51 loc_load.2 dup.0 loc_store.2 push.50 gt
        while.true
            dup.0 movdn.5 mem_storew dropw dup.0 add.1
            swap loc_load.2 dup.0 loc_store.2 lt
        end
        drop loc_load.2 dup.0 loc_store.2 dup.0 dup.0 dup.0 dup.0 mem_loadw
        push.4 loc_load.1 dup.0 loc_store.1 sub dup.0 push.4 eq
        if.true
            drop
        else
            dup.0 loc_store.3 push.1
            while.true
                movup.4 swap sub.1 dup.0 push.0 gt
            end
            drop loc_load.3 dup.0 push.0 gt
            while.true
                swap drop sub.1 dup.0 push.0 gt
            end
            drop
        end
        loc_load.2 dup.0 loc_store.2 sub.1 dup.0 sub.49 push.1 gte
        while.true
            dup.0 dup.0 dup.0 dup.0 dup.0 push.50 eq
            if.true
                mem_loadw.50
            else
                mem_loadw
            end
            movup.4 sub.1 dup.0 sub.49 push.1 gte
        end
        drop loc_load.2 dup.0 loc_store.2 dup.0 dup.0 dup.0 dup.0 mem_loadw
        push.4 loc_load.1 dup.0 loc_store.1 sub dup.0 push.4 eq
        if.true
            drop
        else
            dup.0 loc_store.3 push.1
            while.true
                movup.4 swap sub.1 dup.0 push.0 gt
            end
            drop loc_load.3 dup.0 push.0 gt
            while.true
                swap drop sub.1 dup.0 push.0 gt
            end
            drop
        end
        loc_load.2 dup.0 loc_store.2 sub.1 dup.0 sub.49 push.1 gte
        while.true
            dup.0 dup.0 dup.0 dup.0 dup.0 push.50 eq
            if.true
                mem_loadw.50
            else
                mem_loadw
            end
            movup.4 sub.1 dup.0 sub.49 push.1 gte
        end
        drop loc_load.0 dup.0 push.0 eq
        if.true
            drop
        else
            adv_push.1 swap dup.0 sub.1 push.0 gt
            while.true
                adv_push.1 swap sub.1 dup.0 push.1 gt
            end
            drop
        end
    end
end

proc.read_new_leaf
    adv_push.1 dup.0 dup.0 push.0 gt swap push.129 lt and
    if.true
        push.7 push.0 mem_store.99  push.1 mem_store.200
    else
        dup.0 push.128 gt push.1
        assert_eq dup.0 sub.128 dup.0 dup.0
        mem_store.99 push.8 lt
        if.true
            drop push.7
            push.1 mem_store.200
        else
            u32checked_div.4 dup.0 mem_store.200 mul.4 add.3
        end
    end
end

proc.multi_rphash
    mem_load.200 dup.0 push.1 eq
    if.true
        drop hmerge
    else
        push.1
        while.true
            sub.1
            movdn.8 hmerge
            movup.4 dup.0 push.1 gte
        end
        drop
    end
end

begin
    mem_store.102
    push.1 mem_store.101 adv_push.4 mem_storew.100 dropw
    exec.read_new_leaf exec.read_and_copy exec.multi_rphash dupw mem_storew.40 dropw adv_push.4 hmerge
    adv_push.4 swapw hmerge adv_push.4 swapw hmerge adv_push.4 hmerge
    padw mem_loadw.100 dupw mem_storew.100 dropw movup.4 eq swap movup.4 eq movup.2 movup.4
    eq movup.3 movup.4 eq and and and not
    if.true
        padw mem_storew.100 dropw
    end
    mem_load.99 exec.number_add mul.1 mem_load.102 lt mem_load.101 and mem_store.101
    mem_load.101 padw mem_loadw.100
 end `,
    leaves: [3],
    outputs: [
      ['Age >= 18', 'Adult'],
      ['Age < 18', 'Non-Adult']
    ],
    getPublicInput
  },
  {
    name: 'Continent Check',
    description: 'Check which continent you are on.',
    author: 'did:zk:0xdC6BF231a4f18074288C07C3f31f2eD170E368aD',
    program: ` proc.number_add.4
    dup.0 loc_store.0 push.0 eq
    push.0 loc_store.3
    if.true
        dup.0 push.128 lt
        if.true
            dup.0
        else
            push.0
        end
    else
        push.1.1 loc_store.1
        while.true
            loc_load.1 dup.0
            add.1 loc_store.1 sub.1 dup.0 push.0 gt
            if.true
                push.1
                while.true
                    push.256 swap sub.1 dup.0 push.0 gt
                end
                drop
            else
                drop
            end
            loc_load.1 dup.0 loc_store.1 sub.1 dup.0 loc_store.2 push.1 gt
            while.true
                mul loc_load.2 sub.1 dup.0 loc_store.2 push.1 gt
            end
            loc_load.3 add loc_store.3
            loc_load.1 dup.0 loc_store.1
            loc_load.0 dup.0 loc_store.0 lte
        end
        loc_load.3
    end
    swap drop
end

proc.read_and_copy.60
    mem_load.99 dup.0 mem_store.99 dup.0 push.0 eq
    if.true
        drop drop dup.0 adv_push.7
    else
        swap dup.1 sub loc_store.0 adv_push.1 swap dup.0 sub.1 push.0 gt
        while.true
            adv_push.1 swap sub.1 dup.0 push.1 gt
        end
        drop mem_load.99 dup.0 mem_store.99 add.1
        dup.0 u32checked_mod.4 loc_store.1 u32checked_div.4 add.50
        loc_store.2 mem_storew.50 dropw push.51 loc_load.2 dup.0 loc_store.2 push.50 gt
        while.true
            dup.0 movdn.5 mem_storew dropw dup.0 add.1
            swap loc_load.2 dup.0 loc_store.2 lt
        end
        drop loc_load.2 dup.0 loc_store.2 dup.0 dup.0 dup.0 dup.0 mem_loadw
        push.4 loc_load.1 dup.0 loc_store.1 sub dup.0 push.4 eq
        if.true
            drop
        else
            dup.0 loc_store.3 push.1
            while.true
                movup.4 swap sub.1 dup.0 push.0 gt
            end
            drop loc_load.3 dup.0 push.0 gt
            while.true
                swap drop sub.1 dup.0 push.0 gt
            end
            drop
        end
        loc_load.2 dup.0 loc_store.2 sub.1 dup.0 sub.49 push.1 gte
        while.true
            dup.0 dup.0 dup.0 dup.0 dup.0 push.50 eq
            if.true
                mem_loadw.50
            else
                mem_loadw
            end
            movup.4 sub.1 dup.0 sub.49 push.1 gte
        end
        drop loc_load.2 dup.0 loc_store.2 dup.0 dup.0 dup.0 dup.0 mem_loadw
        push.4 loc_load.1 dup.0 loc_store.1 sub dup.0 push.4 eq
        if.true
            drop
        else
            dup.0 loc_store.3 push.1
            while.true
                movup.4 swap sub.1 dup.0 push.0 gt
            end
            drop loc_load.3 dup.0 push.0 gt
            while.true
                swap drop sub.1 dup.0 push.0 gt
            end
            drop
        end
        loc_load.2 dup.0 loc_store.2 sub.1 dup.0 sub.49 push.1 gte
        while.true
            dup.0 dup.0 dup.0 dup.0 dup.0 push.50 eq
            if.true
                mem_loadw.50
            else
                mem_loadw
            end
            movup.4 sub.1 dup.0 sub.49 push.1 gte
        end
        drop loc_load.0 dup.0 push.0 eq
        if.true
            drop
        else
            adv_push.1 swap dup.0 sub.1 push.0 gt
            while.true
                adv_push.1 swap sub.1 dup.0 push.1 gt
            end
            drop
        end
    end
end

proc.read_new_leaf
    adv_push.1 dup.0 dup.0 push.0 gt swap push.129 lt and
    if.true
        push.7 push.0 mem_store.99  push.1 mem_store.200
    else
        dup.0 push.128 gt push.1
        assert_eq dup.0 sub.128 dup.0 dup.0
        mem_store.99 push.8 lt
        if.true
            drop push.7
            push.1 mem_store.200
        else
            u32checked_div.4 dup.0 mem_store.200 mul.4 add.3
        end
    end
end

proc.multi_rphash
    mem_load.200 dup.0 push.1 eq
    if.true
        drop hmerge
    else
        push.1
        while.true
            sub.1
            movdn.8 hmerge
            movup.4 dup.0 push.1 gte
        end
        drop
    end
end

begin
    push.999 mem_store.101 adv_push.4 mem_storew.100 dropw
    exec.read_new_leaf exec.read_and_copy exec.multi_rphash dupw mem_storew.40 dropw adv_push.4 hmerge
    adv_push.4 hmerge adv_push.4 swapw hmerge
    padw mem_loadw.100 dupw mem_storew.100 dropw movup.4 eq swap movup.4 eq movup.2 movup.4
    eq movup.3 movup.4 eq and and and not
    if.true
        padw mem_storew.100 dropw
    end
    mem_load.99 exec.number_add  mem_store.107 push.1 mem_store.108
    
    push.4.51.31.48.50.64.96.116.156.268.344.356.360 push.364.368.376.392.400.398.414.417.418.422.446.458 push.462.496.104.524.408.512.586.275 push.608.634.682.702.410.144.760.158 push.762.764.626.792.795.784.860.704.887 
      repeat.50
        mem_load.107 eq
        if.true
            push.1 mem_store.101 push.0 mem_store.108
        end
      end

    mem_load.108 push.1 eq 
    if.true
      push.660.28.533.44.52.84.60.92.124.136.188.192.531.212.214.222 push.304.308.312.320.332.340.388.474.484.500.558 push.591.630.652.659.662.663.666.670.534.780.796.840.850

    repeat.40
      mem_load.107 eq
      if.true
        push.3 mem_store.101 push.0 mem_store.108
      end
    end

      mem_load.108 push.1 eq 
      if.true
        push.8.20.40.112.56.70.100.191.196.203.208.233.234 push.246.250.276.292.300.831.348.352.372.833.380.832.428 push.438.440.442.470.498.492.499.528.807 push.578.616.620.642.643.674.688.703.705.724.752.756.804.826.336
        push.248.744
        repeat.52
            mem_load.107 eq
            if.true
              push.2 mem_store.101 push.0 mem_store.108
            end
        end

        mem_load.108 push.1 eq 
        if.true
          push.32.68.76.152.170.218.238.254.328.600.604.740.858.862
          push.535.239
          repeat.16
              mem_load.107 eq
              if.true
                push.5 mem_store.101 push.0 mem_store.108
              end
          end

          mem_load.108 push.1 eq 
          if.true
            push.16.36.184.242.258.316.296.584.583.520.540 push.554.570.580.585.598.882.90.772.776.798.548.876
            push.162.166.334.574.612.581
            repeat.29
              mem_load.107 eq
                if.true
                  push.4 mem_store.101 push.0 mem_store.108
                end
            end

            mem_load.108 push.1 eq 
            if.true
              push.12.24.204.72.854.108.120.132.140.148.174 push.262.180.818.226.232.748.231.266.270.288.324 push.624.384.404.426.430.434.450.454.466 push.478.480.175.504.508.516.562.566.178 push.638.646.678.686.690.694.706 push.710.728.729.834.768.788.800.732.894.716 
              push.86.654.260
              repeat.60
              mem_load.107 eq
                if.true
                    push.0 mem_store.101 push.0 mem_store.108
                end
              end
              
              mem_load.108 push.1 eq 
                  if.true
                      push.10
                      mem_load.107 eq
                      if.true
                          push.6 mem_store.101 push.0
                      end
                      push.74
                      mem_load.107 eq
                      if.true
                          push.6 mem_store.101 push.0
                      end
                  end
            end
          end
        end
      end
    end
    mem_load.101 padw mem_loadw.100
 end `,
    leaves: [4],
    outputs: [
      ['Country in "Africa"', 'Africa'],
      ['Country in "Asia"', 'Asia'],
      ['Country in "Europe"', 'Europe'],
      ['Country in "North America"', 'North America'],
      ['Country in "Oceania"', 'Oceania'],
      ['Country in "South America"', 'South America'],
      ['Country in "Antarctica"', 'Antarctica']
    ]
  },
  {
    name: 'Continent & Adult Check',
    description: 'Check which continent you are on and if you are an adult.',
    author: 'did:zk:0xdC6BF231a4f18074288C07C3f31f2eD170E368aD',
    program: `proc.number_add.4
    dup.0 loc_store.0 push.0 eq
    push.0 loc_store.3
    if.true
        dup.0 push.128 lt
        if.true
            dup.0
        else
            push.0
        end
    else
        push.1.1 loc_store.1
        while.true
            loc_load.1 dup.0
            add.1 loc_store.1 sub.1 dup.0 push.0 gt
            if.true
                push.1
                while.true
                    push.256 swap sub.1 dup.0 push.0 gt
                end
                drop
            else
                drop
            end
            loc_load.1 dup.0 loc_store.1 sub.1 dup.0 loc_store.2 push.1 gt
            while.true
                mul loc_load.2 sub.1 dup.0 loc_store.2 push.1 gt
            end
            loc_load.3 add loc_store.3
            loc_load.1 dup.0 loc_store.1
            loc_load.0 dup.0 loc_store.0 lte
        end
        loc_load.3
    end
    swap drop
end

proc.read_and_copy.60
    mem_load.99 dup.0 mem_store.99 dup.0 push.0 eq
    if.true
        drop drop dup.0 adv_push.7
    else
        swap dup.1 sub loc_store.0 adv_push.1 swap dup.0 sub.1 push.0 gt
        while.true
            adv_push.1 swap sub.1 dup.0 push.1 gt
        end
        drop mem_load.99 dup.0 mem_store.99 add.1
        dup.0 u32checked_mod.4 loc_store.1 u32checked_div.4 add.50
        loc_store.2 mem_storew.50 dropw push.51 loc_load.2 dup.0 loc_store.2 push.50 gt
        while.true
            dup.0 movdn.5 mem_storew dropw dup.0 add.1
            swap loc_load.2 dup.0 loc_store.2 lt
        end
        drop loc_load.2 dup.0 loc_store.2 dup.0 dup.0 dup.0 dup.0 mem_loadw
        push.4 loc_load.1 dup.0 loc_store.1 sub dup.0 push.4 eq
        if.true
            drop
        else
            dup.0 loc_store.3 push.1
            while.true
                movup.4 swap sub.1 dup.0 push.0 gt
            end
            drop loc_load.3 dup.0 push.0 gt
            while.true
                swap drop sub.1 dup.0 push.0 gt
            end
            drop
        end
        loc_load.2 dup.0 loc_store.2 sub.1 dup.0 sub.49 push.1 gte
        while.true
            dup.0 dup.0 dup.0 dup.0 dup.0 push.50 eq
            if.true
                mem_loadw.50
            else
                mem_loadw
            end
            movup.4 sub.1 dup.0 sub.49 push.1 gte
        end
        drop loc_load.2 dup.0 loc_store.2 dup.0 dup.0 dup.0 dup.0 mem_loadw
        push.4 loc_load.1 dup.0 loc_store.1 sub dup.0 push.4 eq
        if.true
            drop
        else
            dup.0 loc_store.3 push.1
            while.true
                movup.4 swap sub.1 dup.0 push.0 gt
            end
            drop loc_load.3 dup.0 push.0 gt
            while.true
                swap drop sub.1 dup.0 push.0 gt
            end
            drop
        end
        loc_load.2 dup.0 loc_store.2 sub.1 dup.0 sub.49 push.1 gte
        while.true
            dup.0 dup.0 dup.0 dup.0 dup.0 push.50 eq
            if.true
                mem_loadw.50
            else
                mem_loadw
            end
            movup.4 sub.1 dup.0 sub.49 push.1 gte
        end
        drop loc_load.0 dup.0 push.0 eq
        if.true
            drop
        else
            adv_push.1 swap dup.0 sub.1 push.0 gt
            while.true
                adv_push.1 swap sub.1 dup.0 push.1 gt
            end
            drop
        end
    end
end

proc.read_new_leaf
    adv_push.1 dup.0 dup.0 push.0 gt swap push.129 lt and
    if.true
        push.7 push.0 mem_store.99  push.1 mem_store.200
    else
        dup.0 push.128 gt push.1
        assert_eq dup.0 sub.128 dup.0 dup.0
        mem_store.99 push.8 lt
        if.true
            drop push.7
            push.1 mem_store.200
        else
            u32checked_div.4 dup.0 mem_store.200 mul.4 add.3
        end
    end
end

proc.multi_rphash
    mem_load.200 dup.0 push.1 eq
    if.true
        drop hmerge
    else
        push.1
        while.true
            sub.1
            movdn.8 hmerge
            movup.4 dup.0 push.1 gte
        end
        drop
    end
end

begin
    mem_store.103

    push.999 mem_store.101 push.1 mem_store.102 adv_push.4 mem_storew.100 dropw
    exec.read_new_leaf exec.read_and_copy exec.multi_rphash dupw mem_storew.40 dropw adv_push.4 hmerge
    adv_push.4 swapw hmerge adv_push.4 swapw hmerge adv_push.4 hmerge
    padw mem_loadw.100 dupw mem_storew.100 dropw movup.4 eq swap movup.4 eq movup.2 movup.4
    eq movup.3 movup.4 eq and and and not
    if.true
        padw mem_storew.100 dropw
    end
    mem_load.99 exec.number_add mul.1 mem_load.103 lt mem_load.102 and mem_store.102
  
    exec.read_new_leaf exec.read_and_copy exec.multi_rphash dupw mem_storew.40 dropw adv_push.4 hmerge
    adv_push.4 hmerge adv_push.4 swapw hmerge
    padw mem_loadw.100 dupw mem_storew.100 dropw movup.4 eq swap movup.4 eq movup.2 movup.4
    eq movup.3 movup.4 eq and and and not
    if.true
        padw mem_storew.100 dropw
    end
    mem_load.99 exec.number_add  mem_store.107 push.1 mem_store.108

   push.4.51.31.48.50.64.96.116.156.268.344.356.360 push.364.368.376.392.400.398.414.417.418.422.446.458 push.462.496.104.524.408.512.586.275 push.608.634.682.702.410.144.760.158 push.762.764.626.792.795.784.860.704.887 
      repeat.50
        mem_load.107 eq
        if.true
            push.1 mem_store.101 push.0 mem_store.108
        end
      end

    mem_load.108 push.1 eq 
    if.true
      push.660.28.533.44.52.84.60.92.124.136.188.192.531.212.214.222 push.304.308.312.320.332.340.388.474.484.500.558 push.591.630.652.659.662.663.666.670.534.780.796.840.850

    repeat.40
      mem_load.107 eq
      if.true
        push.3 mem_store.101 push.0 mem_store.108
      end
    end

      mem_load.108 push.1 eq 
      if.true
        push.8.20.40.112.56.70.100.191.196.203.208.233.234 push.246.250.276.292.300.831.348.352.372.833.380.832.428 push.438.440.442.470.498.492.499.528.807 push.578.616.620.642.643.674.688.703.705.724.752.756.804.826.336
        push.248.744
        repeat.52
            mem_load.107 eq
            if.true
              push.2 mem_store.101 push.0 mem_store.108
            end
        end

        mem_load.108 push.1 eq 
        if.true
          push.32.68.76.152.170.218.238.254.328.600.604.740.858.862
          push.535.239
          repeat.16
              mem_load.107 eq
              if.true
                push.5 mem_store.101 push.0 mem_store.108
              end
          end

          mem_load.108 push.1 eq 
          if.true
            push.16.36.184.242.258.316.296.584.583.520.540 push.554.570.580.585.598.882.90.772.776.798.548.876
            push.162.166.334.574.612.581
            repeat.29
              mem_load.107 eq
                if.true
                  push.4 mem_store.101 push.0 mem_store.108
                end
            end

            mem_load.108 push.1 eq 
            if.true
              push.12.24.204.72.854.108.120.132.140.148.174 push.262.180.818.226.232.748.231.266.270.288.324 push.624.384.404.426.430.434.450.454.466 push.478.480.175.504.508.516.562.566.178 push.638.646.678.686.690.694.706 push.710.728.729.834.768.788.800.732.894.716 
              push.86.654.260
              repeat.60
              mem_load.107 eq
                if.true
                    push.0 mem_store.101 push.0 mem_store.108
                end
              end
              
              mem_load.108 push.1 eq 
                  if.true
                      push.10
                      mem_load.107 eq
                      if.true
                          push.6 mem_store.101 push.0
                      end
                      push.74
                      mem_load.107 eq
                      if.true
                          push.6 mem_store.101 push.0
                      end
                  end
            end
          end
        end
      end
    end

    mem_load.101 dup.0 
    push.999 eq
    if.true
        padw mem_loadw.100
    else 
        mul.2 mem_load.102 
        add padw mem_loadw.100
    end
 end`,
    leaves: [3, 4],
    outputs: [
      ['Country in Africa and Adult', 'Africa & Adult'],
      ['Country in Africa not Adult', 'Africa & No-Adult'],
      ['Country in Asia and Adult', 'Asia & Adult'],
      ['Country in Asia not Adult', 'Asia & No-Adult'],
      ['Country in Europe and Adult', 'Europe & Adult'],
      ['Country in Europe not Adult', 'Europe & No-Adult'],
      ['Country in North America and Adult', 'North America & Adult'],
      ['Country in North America not Adult', 'North & No-Adult'],
      ['Country in Oceania and Adult', 'Oceania & Adult'],
      ['Country in Oceania not Adult', 'Oceania & No-Adult'],
      ['Country in South America and Adult', 'South America & Adult'],
      ['Country in South America not Adult', 'South America & No-Adult'],
      ['Country in Antarctica not Adult', 'Antarctica & No-Adult'],
      ['Country in Antarctica and Adult', 'Antarctica & Adult']
    ],
    getPublicInput
  }
];

const option: ZkProgramOption = [[ZKSBT_CTYPE], config];

export default option;
