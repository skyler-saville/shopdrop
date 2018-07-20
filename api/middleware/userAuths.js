const users = ['guest', 'shopper', 'dropper', 'admin', 'vulcan'] // guest:0, shopper:1, dropper:2, admin:3, vulcan:4

// Vulcan Only
function vulcanOnly (req, res, next) {
  // if GUEST, SHOPPER, DROPPER, or ADMIN
  const user = req.authData.user
  if (user.account_type !== users[4]) {
    res.status(401).json({
      error: 'You are not authorized to be here.',
      reason: 'Incorrect user permissions',
      accountIsActive: user._isActive
    })
  } else {
    // if VULCAN NOT ACTIVE
    if (!user._isActive) {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Account not active',
        accountIsActive: user._isActive
      })
    } else {
      next()
    }
  }
}

// Admin and Up
function adminUp (req, res, next) {
  // if GUEST, SHOPPER, or DROPPER
  const user = req.authData.user
  if (user.account_type !== users[4] || user.account_type !== users[3]) {
    res.status(401).json({
      error: 'You are not authorized to be here.',
      reason: 'Incorrect user permissions',
      accountIsActive: user._isActive
    })
  } else {
    // if VULCAN or ADMIN NOT ACTIVE
    if (!user._isActive) {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Account not active',
        accountIsActive: user._isActive
      })
    } else {
      next()
    }
  }
}

// Dropper and Up
function dropperUp (req, res, next) {
  // if GUEST or SHOPPER
  const user = req.authData.user
  if (user.account_type === users[0] || user.account_type === users[1]) {
    res.status(401).json({
      error: 'You are not authorized to be here.',
      reason: 'Incorrect user permissions',
      accountIsActive: user._isActive
    })
  } else {
    // if DROPPER, ADMIN, or VULCAN NOT ACTIVE
    if (!user._isActive) {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Account not active',
        accountIsActive: user._isActive
      })
    } else {
      next()
    }
  }
}

// Fully OPEN to Public View (ONLY ON GET METHODS)
function guestUp (req, res, next) {
  // if NO ACCOUNT_TYPE
  const user = req.authData.user
  if (!req.authData.user.account_type) {
    res.status(401).json({
      error: 'You are not authorized to be here.',
      reason: 'Incorrect user permissions',
      accountIsActive: user._isActive
    })
  } else {
    // if ANY ACCOUNT_TYPE NOT ACTIVE
    if (!user._isActive) {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Account not active',
        accountIsActive: user._isActive
      })
    } else {
      next()
    }
  }
}

// locations, brands, products GET/:id == self OR user_type == admin or vulcan
function openGetAdminUp (req, res, next) {
  const user = req.authData.user
  // NOT ADMIN or VULCAN
  if (!user.account_type === users[4] || !user.account_type === users[3]) {
    // IF USER._ID === THIS USER
    if (req.params._id === user._id && user._isActive) {
      next()
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Account ID does not match path/:id',
        accountIsActive: user._isActive
      })
    }
  } else {
    if (!user._isActive) {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Account not active',
        accountIsActive: user._isActive
      })
    } else {
      next()
    }
  }
}

// orders OPEN GET/:id == self OR user_type == dropper, admin, or vulcan
function openGetDropperUp (req, res, next) {
  const user = req.authData.user
  if (user.account_type === users[0] || user.account_type === users[1]) {
    // Check params against users id
    if (req.params._id === user._id && user._isActive === 'true') {
      next()
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Account ID does not match path/:id',
        accountIsActive: user._isActive
      })
    }
  } else {
    if (user._isActive) {
      next()
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Admin account not active',
        accountIsActive: user._isActive
      })
    }
  }
}

function userIdOrVulcan (req, res, next) {
  const user = req.authData.user
  // NOT VULCAN
  if (user.account_type !== 'vulcan') {
    if (user._isActive) {
      if (req.params._id === user._id) {
        next()
      } else {
        res.status(401).json({
          error: 'You are not authorized to be here.',
          reason: 'Account id does not match path/:id',
          accountIsActive: user._isActive
        })
      }
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'User account not active',
        accountIsActive: user._isActive
      })
    }
  } else {
    // user IS VULCAN
    if (user._isActive) {
      next()
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Admin account not active',
        accountIsActive: user._isActive
      })
    }
  }
}

function userIdOrAdminUp (req, res, next) {
  const user = req.authData.user
  // NOT VULCAN OR ADMIN
  if (user.account_type !== 'vulcan' || user.account_type !== 'admin') {
    // if not vulcan or admin, but account is active...
    if (user._isActive) {
      // if not adminUP && account is active && params === user._id
      if (req.params._id === user._id) {
        // then allow passthrough
        next()
      } else {
        res.status(401).json({
          error: 'You are not authorized to be here.',
          reason: 'Account id does not match path/:id',
          accountIsActive: user._isActive
        })
      }
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'User account not active',
        accountIsActive: user._isActive
      })
    }
  } else {
    // user IS VULCAN
    if (user._isActive) {
      next()
    } else {
      res.status(401).json({
        error: 'You are not authorized to be here.',
        reason: 'Admin account not active',
        accountIsActive: user._isActive
      })
    }
  }
}

module.exports = {
  vulcanOnlyAuth: vulcanOnly,
  adminUpAuth: adminUp,
  dropperUpAuth: dropperUp,
  guestUpAuth: guestUp,
  selfGetAdminUpAuth: openGetAdminUp,
  selfGetDropperUpAuth: openGetDropperUp,
  userIdOrVulcanAuth: userIdOrVulcan,
  userIdOrAdminUpAuth: userIdOrAdminUp
}
